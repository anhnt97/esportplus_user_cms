const app = new Vue({

    el: '#upload-posts-manager-app',

    data() {
        return {
            options: [],
            post_manager_category: "",
            show_up: false,
            create_request: {
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
                type:0,
                link_streams:[],
                set:1,
                match:1,
                start_time:0,
                bet_status:0,
                bet_modes:[]
            },
            team1: "",
            team2: "",
            listTeam1:[],
            listTeam2:[],
            listMember:[],
            list_link_stream:[],
            bet_modes:[]
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
        $('#dateTo').datetimepicker({
            locale: 'en',
            format: DATE_FORMAT
        });
        $("#dateTo").val(getFullDateTime(new Date()));
        this.getCategories();
        this.onBtnAddStream();
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
                        if(i == 0)
                        {
                            this.post_manager_category = id;
                            this.getListBetModeById(obj.type_cat);
                        }
                    }
                }
            });

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
        onButtonCreateClick(){
            let tags = $("#tags_id").tagsinput('items');
            if (!checkInputString(this.create_request.title)) {
                showDialog("Notice", "Please enter title");
                return false;
            }

            if (!checkInputString(this.create_request.description)) {
                showDialog("Notice", "Please enter description");
                return false;
            }
            this.create_request.categories = [];
            this.create_request.categories.push(this.post_manager_category);
            if(this.create_request.categories.length === 0)
            {
                showDialog("Notice", "Please pick categories");
                return false;
            }
            if(!checkInputString(this.create_request.game_mode))
            {
                showDialog("Notice", "Please fill game mode");
                return false;
            }
            this.create_request.members1 = this.listTeam1;
            this.create_request.members2 = this.listTeam2;
            // set name,score team
            this.create_request.tags = tags;
            const dateTo = $("#dateTo").val();
            this.create_request.start_time = new Date(dateTo).getTime();

            let arr_link = [];
            for(var i= 0; i < this.list_link_stream.length; i++)
            {
                arr_link.push(this.list_link_stream[i]["link"]);
            }

            this.create_request.link_streams = arr_link;
            // set date time

            this.create_request.thumb = $('#thumbnail-news').attr('src');
            let obj = JSON.stringify(this.create_request);
            console.log(obj);

            confirmDialog("Do you want Create this content ?", "Create", () => {
                 this.createPostManager();
                // this.resetDataUpload();
            });

        },
        createPostManager(){
            const req = new Request();
            req.post("bet-match-create", this.create_request, (data) => {
                if (parseInt(data.rc) === 0) {
                    const id = data.id;
                    showDialog("Notice", "Create content success <br/>", null, () => {

                    });
                    this.$emit("content-created", id);
                } else {
                    showDialog("Warning", "Create content failure <br/>" + data.rd);
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
                    let terms = thisTemp.split(thisTemp.team1);
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push( ui.item.value );
                    // add placeholder to get the comma-and-space at the end
                    terms.push( "" );
                    thisTemp.team1 = terms.join( ", " );
                    let memberId = ui.item.member_id;
                    thisTemp.listTeam1.push(memberId);
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
                    let terms = thisTemp.split(thisTemp.team2);
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push( ui.item.value );
                    // add placeholder to get the comma-and-space at the end
                    terms.push( "" );
                    thisTemp.team2 = terms.join( ", " );
                    let memberId = ui.item.member_id;
                    thisTemp.listTeam2.push(memberId);
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
            console.log('Key Video Search Value:', keySearch);
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
                    console.log("List team :  " + JSON.stringify(this.listMember));
                });
            }
        },
        split(val){
            return val.split( /,\s*/ );
        },
        extractLast(term){
            return this.split(term).pop();
        },
        onBtnAddStream(){
            this.list_link_stream.push({id:this.list_link_stream.length, link:""});
        },

        getListBetModeById(type_cat){
            let params = {
                type_cat:type_cat
            };
            const req = new Request();
            req.requestNoModal("get-bet-modes", params, (data)=>{
                let datas = data.rows;
                this.bet_modes = datas;
            });
        }
    }

});