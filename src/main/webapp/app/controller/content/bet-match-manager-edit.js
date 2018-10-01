const app = new Vue({

    el: '#bet-match-manager-edit-app',

    data() {
        return {
            options: [],

            posts_manager_id: "",
            post_manager_category: "",
            show_up: false,
            update_request: {
                id: "",
                type: 1,
                set: 1,
                match: 1,
                categories: [],
                title: "",
                description: "",
                thumb: "",
                tournaments: "",
                creator: "",
                members1:[],
                members2:[],
                game_mode:"",
                link_streams: [],
                tags: [],
                score1:0,
                score2:0,
                status:NORMAL,
                start_time: "",
                bet_status:0,
                betMatchConditions:[],
            },
            team1: "",
            team2: "",
            listTeam1:[],
            listTeam2:[],
            listMember:[],
            //list current match - map by id set
            total_set_match:[],
            list_current_matchs:[],
            list_options:[],
            current_set: 1,
            listVideo:[],
            current_match:1,
            list_link_stream: [],
            bet_modes:[],

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
        $('#dateTo').val(moment().format(DATE_FORMAT));
        $('#dateTo').datetimepicker({
            locale: 'en',
            format: DATE_FORMAT
        });

        console.log("on Mounted add posts manager");
        const url = window.location.href.slice(window.location.href.indexOf('?') + 1);
        if (url !== undefined && url !== null && url.trim().length > 0) {
            const obj = convertQueryStringToJson(url);
            if (obj !== null && obj !== undefined) {
                this.posts_manager_id = obj.id;
            }
        }
        this.getCategories();
        this.total_set_match=[];
        this.list_current_matchs=[];
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
                const rows = data.rows;
            if (rows !== undefined && rows !== null && rows.length > 0) {
                this.options = [];
                for (let i = 0; i < rows.length; i++) {
                    const obj = rows[i];
                    const title = obj.title;
                    const id = obj._id;
                    this.options.push({
                        id: id,
                        name: title,
                        check: "checked"
                    });
                }
                this.loadContent();
            }

            });

        },
        loadContent() {
            const params = {
                id: this.posts_manager_id
            };
            this.update_request.id = this.posts_manager_id;
            const req = new Request();
            req.request("get-bet-match-info", params, (data) => {
                hideAllModal();
                console.log(JSON.stringify(data));
                this.fillData(data);
                //this.getListMember();
            });
        },
        fillData(data) {
            const rc = parseInt(data.rc);
            if (rc === 0) {
                const item = data.item.betMatch;

                this.bet_modes = data.item["betMatchConditions"];
                this.bet_modes.forEach((e,i)=>{
                    console.log(JSON.stringify(e));
                    if(e["status"] == 0)
                    {
                     this.bet_modes[i]["check"] = "checked";
                    } else{
                    this.bet_modes[i]["check"] = false;
                }
                });

                console.log(JSON.stringify(this.bet_modes));

                this.update_request.betMatchConditions= data.item["betMatchConditions"];
                if (item !== null && item !== undefined) {

                    this.update_request.title = item.title;
                    this.update_request.game_mode = item.game_mode;
                    this.update_request.tournaments = item.tournaments;
                    this.update_request.description = item.description;
                    this.update_request.thumb = item.thumb;
                    this.update_request.start_time = item.start_time;
                    this.update_request.type = item.type;
                    this.update_request.tags = item.tags;
                    this.update_request.bet_status = item.bet_status;
                    if (this.update_request.thumb !== ""){
                        $("#thumbnail-news").css("display","block");
                    }

                    const cats_data = [];
                    const cats_origin = item.categories;
                    if (isArray(cats_origin)) {
                        for (let i = 0; i < cats_origin.length; ++i) {
                            const o = cats_origin[i];
                            cats_data.push(o._id);
                        }
                    }
                    this.update_request.categories = cats_data;

                    // set member
                    let list_team1 = item["list_team_bet"][0];
                    let list_team2 = item["list_team_bet"][1];
                    this.update_request.score1 = list_team1.score_team;
                    this.update_request.score2 = list_team2.score_team;


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
                    // current set ,match
                    this.current_set = item.set;
                    this.current_match = item.match;
                    // current status
                    this.update_request.status = item.status;



                    if(item.start_time != null)
                    {
                        const start_time_effect =  item.start_time ;
                        let date = new Date();
                        try {
                            date = new Date(start_time_effect);
                        } catch (e) {
                            console.error("e = " + e);
                        }
                        $('#dateTo').val(getFullDateTime(date));
                    }

                    this.list_link_stream = item["channels"];

                    // item["channels"].forEach((e,i)=>{
                    //     let link = e["link_stream"];
                    //     this.list_link_stream.push(link);
                    //
                    // });
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
            emptyArray(this.update_request.link_streams);

            this.update_request.members1 = this.listTeam1;
            this.update_request.members2 = this.listTeam2;

            this.update_request.thumb = $('#thumbnail-news').attr('src');

            if(this.list_link_stream.length == 0)
            {
                showDialog("Warning", "Link stream cannot be empty !");
                return;
            }

            console.log(JSON.stringify(this.list_link_stream));

            for(let i = 0; i < this.list_link_stream.length; i++)
            {
                let link_stream = this.list_link_stream[i]["link_stream"];
                if(link_stream != null && link_stream != "")
                    this.update_request.link_streams.push(link_stream);
            }

            if(this.update_request.categories.length > 1 || this.update_request.categories.length < 1)
            {
                showDialog("Warning", "Must choose 1 Categories");
                return;
            }
            let obj = JSON.stringify(this.update_request);
            console.log(obj);
            confirmDialog("Do you want update this content ?", "Create", () => {
                this.updateBetMatchManager();
                // this.resetDataUpload();
            });

        },
        onBtnAddStream(){
            this.list_link_stream.push({channel_id:"",link_stream:""});
        },
        updateBetMatchManager(){
            const req = new Request();
            console.log("Data update" + JSON.stringify(this.update_request));
            req.update("update-bet-match", this.update_request, (data) => {
                if (parseInt(data.rc) === 0) {
                    showDialog("Notice", "Update bet match success <br/>", null, () => {
                        location.reload();
                    });
                } else {
                    showDialog("Warning", "Update bet match failure <br/>" + data.rd);
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
            // console.log(this.$refs.nested[idx_input-1]);
            let thisTemp = this;
            $(this.$refs.nested[idx_input-1]).autocomplete({
                minLength: 0,
                source: this.listVideo,
                focus: function( event, ui ) {
                    $(this.$refs.nested[idx_input-1]).val( ui.item.title);
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

            console.log(set+"/" + match+"/" + id+"/" + title+"/" + thumb);
            this.list_current_matchs.forEach((e, i) => {
                if (e.match === match) {
                    this.list_current_matchs[i].match_id = id;
                    this.list_current_matchs[i].match_name = title;
                    this.list_current_matchs[i].thumb = thumb;
                }
            });


            this.total_set_match.forEach((e, i)=>{
                if(e.set === this.currentset)
                {
                    let matches_arr = e.matches;

                    let idx = 0;
                    matches_arr.forEach((k,h)=>{

                        console.log(JSON.stringify(k) + "///" + this.total_set_match[i]["matches"][h]);
                        if(k.match === match)
                        {
                            idx = 1;
                            this.total_set_match[i]["matches"][h].match_id = id;
                            this.total_set_match[i]["matches"][h].match_name = title;
                            this.total_set_match[i]["matches"][h].thumb = thumb;
                        }else{

                        }
                    });

                    if(idx === 0)
                    {
                        this.total_set_match[i]["matches"].push({match_id:id, match_name:title, thumb:thumb, match:match});
                    }

                }

            });
            console.log(JSON.stringify(this.total_set_match));

        },
        addSet(){
            let text = "Set " + (this.list_options.length + 1).toString();
            let value = (this.list_options.length + 1).toString();
            this.list_options.push({text:text, value:value});
            this.total_set_match.push({set:this.list_options.length, matches:[]})
        },
        addMatch()
        {
            let match = this.list_current_matchs.length + 1;
            this.list_current_matchs.push({match_id:"",match_name:"",match:match,thumb:""});
        },
        onSelectContent(e){
            emptyArray(this.list_current_matchs);
            this.list_current_matchs = this.total_set_match[this.currentset - 1]["matches"].slice();
            console.log(JSON.stringify(this.total_set_match));
        },
        onBtnDeleteMatch(index)
        {
            this.updateSet_Match(this.currentset, index, "","","");
        },
        onBtnAddMatch(index)
        {
            this.addMatch();
        },
        onBtnAddSet(){
            this.addSet();
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
        }
    }

});