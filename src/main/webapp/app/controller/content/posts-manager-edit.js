const app = new Vue({

    el: '#posts-manager-edit-app',

    data() {
        return {
            options: [],
            posts_manager_id: "",
            post_manager_category: "",
            show_up: false,
            update_request: {
                id: "",
                type: 1,
                categories: [],
                title: "",
                description: "",
                thumb: "",
                tournaments: "",
                creator: "",
                members1:[],
                members2:[],
                game_mode:"",
                tags: [],
                score1:0,
                score2:0,
                status:PENDING
            },
            team1: "",
            team2: "",
            listTeam1:[],
            listTeam2:[],
            listMember:[],
            //list current match - map by id set
            total_set_match:[{"set":0,"matches":[]}],
            list_current_matchs:[],
            list_options:[],
            currentset:1,
            listVideo:[],
            current_match:1,

        }
    },
    watch: {
        team1: function (val) {
            if (val === ""){
                this.listTeam1 = [];
            }
        },
        team2: function (val) {
            if (val === "") {
                this.listTeam2 = [];

            }
        }
    },
    mounted() {
        console.log("on Mounted add posts manager");
        const url = window.location.href.slice(window.location.href.indexOf('?') + 1);
        if (url !== undefined && url !== null && url.trim().length > 0) {
            const obj = convertQueryStringToJson(url);
            if (obj !== null && obj !== undefined) {
                this.posts_manager_id = obj.id;
            }
        }
        this.getCategories();
        this.total_set_match=[{"set":0,"matches":[]}];
        this.list_current_matchs=[];
        this.currentset = 1;
    },

    methods: {
        onClickAddTeam(){
            let href = "add-team";
            window.open(href, '_blank');
            return false;
        },
        getCategories() {

            const req = new Request();
            const params = {
                start: 0,
                limit: 1000000,
                type_page: TYPE_PAGE_VIDEO
            };

            req.requestNoModal("get-category", params, (data) => {
                let rows = data.rows;
                if (rows !== undefined && rows !== null && rows.length > 0) {
                    this.options = [];
                    for (let i = 0; i < rows.length; i++) {
                        let obj = rows[i];
                        let title = obj.title;
                        let id = obj._id;
                        this.options.push({id: id, name: title});
                    }
                }
                this.loadContent();
            });

        },
        loadContent() {
            const params = {
                id: this.posts_manager_id
            };
            this.update_request.id = this.posts_manager_id;
            const req = new Request();
            req.request("get-posts-manager-info", params, (data) => {
                hideAllModal();
                console.log(JSON.stringify(data));
                this.fillData(data);
                //this.getListMember();
            });
        },
        fillData(data) {
            const rc = parseInt(data.rc);
            if (rc === 0) {
                const item = data.item;
                if (item !== null && item !== undefined) {

                    this.update_request.title = item.title;
                    this.update_request.game_mode = item.game_mode;
                    this.update_request.tournaments = item.tournaments;
                    this.update_request.description = item.description;
                    this.update_request.thumb = item.thumb;
                    if (this.update_request.thumb !== "") {
                        $("#thumbnail-news").css("display","block");
                    }

                    // set tags
                    const tags = item.tags;
                    let strTags = "";
                    if (isArray(tags)) {
                        for (let i = 0; i < tags.length; ++i) {
                            if (i > 0) {
                                strTags += ",";
                            }
                            strTags += tags[i];
                        }
                    }
                    $('#tags_id').tagsinput("add", strTags);
                    //set category
                    this.post_manager_category = item.categories[0]._id;
                    // set member 1
                    let list_team1 = item["list_team_bet"][0];
                    let list_team2 = item["list_team_bet"][1];
                    this.update_request.score1 = list_team1.score_team;
                    this.update_request.score2 = list_team2.score_team;

                    let list_ids1 = "";
                    let list_ids2 = "";

                    // this.fillDataMember(list_team1, this.team1, this.listTeam1).bind(this);
                    // this.fillDataMember(list_team2, this.team2, this.listTeam2).bind(this);

                    for(let i = 0 ; i < list_team1.members.length ; i++){
                        this.team1 = list_team1.members[i].name;
                        if (i !== list_team1.members.length - 1){
                            this.team1.concat(", ");
                        }
                        this.listTeam1.push(list_team1.members[i]);
                    }
                    for(let i = 0 ; i < list_team2.members.length ; i++){
                        this.team2 = list_team2.members[i].name;
                        if (i !== list_team2.members.length - 1){
                            this.team2.concat(", ");
                        }
                        this.listTeam2.push(list_team2.members[i]);
                    }

                    let sets_item = item["sets"];
                    if(sets_item != null && sets_item != undefined && sets_item.length > 0)
                    {
                        this.list_current_matchs = sets_item[0]["matches"].slice();

                        this.total_set_match = sets_item.slice();

                        if(this.total_set_match.length > 0)
                        {
                            for(let i = 0; i < this.total_set_match.length; i++)
                            {
                                // let text = "Set " + (i + 1).toString();
                                // let value = (i + 1).toString();
                                let value = this.total_set_match[i]["set"];
                                let text = "Set " + value;
                                this.list_options.push({text:text, value:value});
                            }
                        }
                    }else{
                        this.onSelectSet();
                    }
                }
            }
        },
        onClickUploadThumb: function () {
            this.isShow = true;
        },
        onCloseThumb: function () {
            this.isShow = false;
        },
        onUploadThumbSuccess: function (link) {
            $("#thumbnail-news").attr('src', link);
            $("#thumbnail-news").css("display", "block");
        },
        onButtonUpdateClick(){
            let tags = $("#tags_id").tagsinput('items');
            if (!checkInputString(this.update_request.title)) {
                showDialog("Notice", "Please enter title");
                return false;
            }

            if (!checkInputString(this.update_request.description)) {
                showDialog("Notice", "Please enter description");
                return false;
            }
            this.update_request.categories = [];
            this.update_request.categories.push(this.post_manager_category);
            if(this.update_request.categories.length === 0)
            {
                showDialog("Notice", "Please pick categories");
                return false;
            }
            if(!checkInputString(this.update_request.game_mode))
            {
                showDialog("Notice", "Please fill game mode");
                return false;
            }
            this.update_request.members1 = this.listTeam1;
            this.update_request.members2 = this.listTeam2;
            // set name,score team
            this.update_request.tags = tags;
            this.update_request.sets = this.total_set_match;
            // set date time

            this.update_request.thumb = $('#thumbnail-news').attr('src');
            let obj = JSON.stringify(this.update_request);
            console.log(obj);

            confirmDialog("Do you want update this content ?", "Create", () => {
                this.updateBetMatchManager();
                // this.resetDataUpload();
            });

        },
        updateBetMatchManager(){
            const req = new Request();
            req.update("update-pmg", this.update_request, (data) => {
                if (parseInt(data.rc) === 0) {
                    const id = data.id;
                    showDialog("Notice", "Update content success <br/>", null, () => {

                    });
                    this.$emit("content-created", id);
                } else {
                    showDialog("Warning", "Update content failure <br/>" + data.rd);
                }
            });
        },
        autoComplete() {
            let thisTemp = this;
            $("#lblTeam1")
                .autocomplete({
                    minLength: 0,
                    source: function( request, response ) {
                        // delegate back to autocomplete, but extract the last term
                        response( $.ui.autocomplete.filter(
                            thisTemp.listMember, thisTemp.extractLast( request.term ) ) );
                    },
                    focus: function( event, ui ) {
                        //$( "#lblTeam1").val( ui.item.name);
                        return false;
                    },
                    select: function (event, ui) {
                        // thisTemp.team1 = "";
                        // thisTemp.team1 +=","+ ui.item.value ;
                        // thisTemp.bindingMem( ui.item, thisTemp.listTeam1);
                        //
                        let terms = thisTemp.split(thisTemp.team1);
                        // remove the current input
                        terms.pop();
                        // add the selected item
                        terms.push( ui.item.value );
                        // add placeholder to get the comma-and-space at the end
                        terms.push( "" );
                        thisTemp.team1 = terms.join( ", " );
                        let memberId = ui.item.member_id;
                        let member_name = ui.item.name;
                        thisTemp.listTeam1.push({id:memberId, name:member_name});
                        return false;
                    }
                })
                .autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + item.name + "</div>")
                    .appendTo(ul);
            };
            $("#lblTeam2").autocomplete({
                minLength: 0,
                source:function( request, response ) {
                    // delegate back to autocomplete, but extract the last term
                    response( $.ui.autocomplete.filter(
                        thisTemp.listMember, thisTemp.extractLast( request.term ) ) );
                },
                focus: function( event, ui ) {
                    // $( "#lblTeam2").val( ui.item.name);
                    return false;
                },
                select: function (event, ui) {
                    // thisTemp.team2 +=","+ ui.item.value ;
                    // thisTemp.bindingMem( ui.item, thisTemp.listTeam2);

                    let terms = thisTemp.split(thisTemp.team2);
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push( ui.item.value );
                    // add placeholder to get the comma-and-space at the end
                    terms.push( "" );
                    thisTemp.team2 = terms.join( ", " );
                    let memberId = ui.item.member_id;
                    let member_name = ui.item.name;
                    //{"name":"Member","id":"5b65241f195cfb30cb428b0d"
                    thisTemp.listTeam2.push({id:memberId, name:member_name});
                    return false;
                }
            })
                .autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + item.name + "</div>")
                    .appendTo(ul);
            };
        },
        onMemberNameKeyUp(keySearch){
            if (keySearch.indexOf(", ") === -1){
                this.listMember = [];
                this.searchMemberByName(keySearch);
            }else{
                let tempKeySearch = keySearch.split(", ");
                let keySearchNext = tempKeySearch[tempKeySearch.length - 1];
                this.listMember = [];
                this.searchMemberByName(keySearchNext);
            }
            //this.autoComplete();
        },
        searchMemberByName(keySearch){
            if (checkInputString(keySearch)){
                keySearch = keySearch.trim();
                let params = {
                    keyword: encodeURIComponent(keySearch),
                };
                const req = new Request();
                req.requestNoModal("find-member",params, (data) => {
                    let datas = data.rows;
                    if (isArray(datas)) {
                        for(let i = 0 ; i < datas.length ; i ++){
                            let temp = {
                                value: datas[i].name,
                                name: datas[i].name,
                                member_id: datas[i]._id,
                                team_id: datas[i].team_id
                            };
                            this.listMember.push(temp);
                        }
                    }
                    if (this.listMember !== []){
                        this.autoComplete();
                    }
                });
            }
        },
        split(val){
            return val.split( /,\s*/ );
        },
        extractLast(term){
            return this.split(term).pop();
        }
        ,
        findTeamMem(list_ids, index)
        {
            let params = {
                list_id: list_ids
            };
            const req = new Request();
            req.requestNoModal("find-team-mem",params, (data) => {

           // {"rc":0,"rd":"OK","total":1,"autoCompleteSugesstions":null,"rows":[{"name":"KZ DragonX","_id":"5b63fdb3195cfb1d976e1ce0","team_id":"5b63fdb3195cfb1d976e1cdf"}]}
            let datas = data.rows;
            if(isArray(datas)){
                let list_member = "";
                for(let i = 0; i < datas.length; i++)
                {
                    let name = datas[i]["name"];
                    list_member += name +",";
                }
                if(index == 0)
                {
                    this.team1  = list_member;
                }else{
                    this.team2 = list_member;
                }
            }
        });
        },
        autoCompleteVideo(idx_input) {
            console.log(this.$refs.nested + "idx = " + idx_input);
            let thisTemp = this;
            $(this.$refs.nested[idx_input-1]).autocomplete({
                minLength: 0,
                source: this.listVideo,
                focus: function( event, ui ) {
                    $(thisTemp.$refs.nested[idx_input-1]).val( ui.item.title);
                    return false;
                },
                select: function (event, ui) {
                    // console.log(thisTemp.current_match);
                    let current_id = ui.item.id;
                    let current_title = ui.item.title;
                    let current_thumb = ui.item.thumb;
                    thisTemp.updateSet_Match(thisTemp.currentset, thisTemp.current_match,current_id, current_title, current_thumb);

                    //update list object

                    return false;
                }
            });
            $(this.$refs.nested[idx_input-1]).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + "<img style='width: 100px;height: 75px' src='" + item.thumb + "'>" + item.title + "</div>")
                    .appendTo(ul);
            };
        },
        onAutoComplete(target){
            console.log(JSON.stringify(target));

        },
        onMatchParentNameKeyUp(keySearch, idx){
            this.current_match = idx;
            this.listVideo = [];
            this.searchVideoByName(keySearch);
            this.autoCompleteVideo(idx);
        },
        searchVideoByName(keySearch){
            console.log('Key Video Search Value:', keySearch);
            // let params = {
            //             type: 0,
            //             offset: 0,
            //             keyword: encodeURIComponent(keySearch),
            //             os_id: 1
            //         };
            //
            // $('#input_video').devbridgeAutocomplete({
            //     serviceUrl:"find-post",
            //     type:"GET",
            //     dataType:"json",
            //     params:params,
            //     onSearchComplete: function (query, suggestions){
            //         console.log(JSON.stringify(suggestion));
            //     },
            //     onSelect: function(suggestion) {
            //        console.log(JSON.stringify(suggestion));
            //     },
            //     onHint: function (hint) {
            //     },
            //     onInvalidateSelection: function() {
            //     },
            //     formatResult: function(suggestion, currentValue){
            //         return suggestion.title;
            //     }
            // });

            if (checkInputString(keySearch)){
                keySearch = keySearch.trim();
                let params = {
                    type: 0,
                    offset: 0,
                    keyword: encodeURIComponent(keySearch),
                    os_id: 1
                };
                const req = new Request();
                req.requestNoModal("find-post",params, (data) => {
                    let datas = data.datas;
                if (isArray(datas)) {
                    for(let i = 0 ; i < datas.length ; i ++){
                        let temp = {
                            value: datas[i].title,
                            title: datas[i].title,
                            thumb: datas[i].thumb,
                            id: datas[i].id
                        };
                        this.listVideo.push(temp);
                    }
                }
            });
            }
        },

        updateSet_Match(set, match, id, title, thumb)
        {

            // console.log(set+"/" + match+"/" + id+"/" + title+"/" + thumb);
            this.list_current_matchs.forEach((e, i) => {
                if (e.match == match) {
                    this.list_current_matchs[i].match_id = id;
                    this.list_current_matchs[i].match_name = title;
                    this.list_current_matchs[i].thumb = thumb;
                }
            });


            this.total_set_match.forEach((e, i)=>{
                if(e.set == this.currentset)
                {
                    let matches_arr = e.matches;

                    let idx = 0;
                    matches_arr.forEach((k,h)=>{
                        // console.log(JSON.stringify(k) + "///" + this.total_set_match[i]["matches"][h]);
                        if(k.match == match)
                        {
                            idx = 1;
                            this.total_set_match[i]["matches"][h].match_id = id;
                            this.total_set_match[i]["matches"][h].match_name = title;
                            this.total_set_match[i]["matches"][h].thumb = thumb;
                        }else{

                        }
                    });

                    if(idx == 0)
                    {
                        this.total_set_match[i]["matches"].push({match_id:id, match_name:title, thumb:thumb, match:match});
                    }

                }

            });
            console.log(JSON.stringify(this.total_set_match));

        },
        addSet(){
            let set_now = this.getLastSetIndex();
            let text = "Set " + set_now.toString();
            let value = set_now.toString();
            this.list_options.push({text:text, value:value});
            this.total_set_match.push({set:this.list_options.length, matches:[]});
            this.currentset ++;
            this.onSelectSet(this.currentset);
        },
        addMatch()
        {
            let match = this.getLastMatchIndex();
            console.log("Match last"+match);
            this.list_current_matchs.push({match_id:"",match_name:"",match:match,thumb:""});
        },
        onSelectSet(){
            emptyArray(this.list_current_matchs);
            console.log(JSON.stringify(this.total_set_match) + "/" + this.currentset);
            let matches = this.total_set_match[this.currentset - 1]["matches"];
            if(matches != undefined)
            this.list_current_matchs = matches.slice();

        },
        onBtnDeleteMatch(index, match_id)
        {
            this.list_current_matchs.forEach((e, i)=>{
                if (e.match == index) {
            this.list_current_matchs.splice(i, 1);
                }
            });

                this.total_set_match.forEach((e, i)=>{
                    if(e.set == this.currentset)
                {
                        let matches_arr = e.matches;

                        let idx = 0;
                        matches_arr.forEach((k,h)=>{
                            if(k.match == index)
                        {
                            this.total_set_match[i]["matches"].splice(h, 1);
                        }
                        });
                }

            });

            // private String [] post_ids;
            // private String post_manager_id;
            let params = {
                post_ids:[match_id],
                post_manager_id:this.posts_manager_id
            };
            const req = new Request();
            req.delete("match-delete", params, (data) => {
            });


        },
        onBtnAddMatch(index)
        {
            this.addMatch();
        },
        onBtnAddSet(){
            this.addSet();
        },
        onBtnDeleteSet(currset){
            console.log(currset);
            this.list_options.forEach((e,i)=>{
                if(e.value == currset)
                    this.list_options.splice(i, 1);
            });
            this.total_set_match.forEach((e, i)=>{
                    if(e.set == currset)
                {
                    this.total_set_match.splice(i, 1);
                }
            });

            let params = {
                set_ids:[currset],
                post_manager_id:this.posts_manager_id
            };
            const req = new Request();
            req.delete("set-delete", params, (data) => {
            });

            if(this.currentset > 0)
                this.currentset --;
            this.onSelectSet();
        },
        fillDataMember(sourceTeam, client_team_name, client_list_team){
            for(let i = 0 ; i < sourceTeam.members.length ; i++){
                // console.log(JSON.stringify(sourceTeam.members[i]));

                if (i !== sourceTeam.members.length - 1){
                    client_team_name.concat(", ");
                }
                client_list_team.push(sourceTeam.members[i]);
                // list_ids2 += list_team2.members[i] + ",";
            }
        },
        bindingMem(item, client_list_team){
            let memberId = item.member_id;
            let member_name = item.name;
            //{"name":"Member","id":"5b65241f195cfb30cb428b0d"
            client_list_team.push({id:memberId, name:member_name});
        },
        getLastMatchIndex()
        {
            try{
                let max_val = this.list_current_matchs[0]["match"];
                for(let i = 0; i < this.list_current_matchs.length; i++)
                {
                    if(this.list_current_matchs[i]["match"] > max_val)
                        max_val = this.list_current_matchs[i]["match"];
                }
                return max_val + 1;
            }catch (ex) {
                return 1;
            }
        },
        getLastSetIndex(){
            try{
                let max_val = this.total_set_match[0]["set"];
                for(let i = 0; i < this.total_set_match.length; i++)
                {
                    if(this.total_set_match[i]["set"] > max_val)
                        max_val = this.total_set_match[i]["set"];
                }
                return max_val + 1;
            }catch (e) {
                return 1;
            }
        }
    }

});