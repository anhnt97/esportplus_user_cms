const editTeam = new Vue({
    el: "#team-member-edit-app",
    data(){
        return {
            options: [],
            show_form_upload: false,
            team_id: "",
            member_name: "",
            list_member: [],
            update_team_category: "",
            update_team:{
                team_id: "",
                name: "",
                icon: "",
                categories: []
            },
            add_member: {
                team_id: "",
                member_names: []
            }
        }
    },
    mounted(){
        const url = window.location.href.slice(window.location.href.indexOf('?') + 1);
        if (url !== undefined && url !== null && url.trim().length > 0) {
            const obj = convertQueryStringToJson(url);
            if (obj !== null && obj !== undefined) {
                this.team_id = obj.id;
            }
        }
        this.getCategory();
    },
    methods: {
        getCategory() {
            const req = new Request();
            const params = {
                start: 0,
                limit: 100000,
                type_page: TYPE_PAGE_NEWS
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
        getListMember(){
            const req = new Request();
            const params = {
               team_id: this.team_id
            };
            req.requestNoModal("get-list-member", params, (data) => {
                const rows = data.rows;
                if (rows !== undefined && rows !== null && rows.length > 0) {
                    this.list_member = rows;
                }
            });
        },
        onUploadSuccess(urlImage){
            this.add_team.team_icon = urlImage;
            // $("#thumbnail-news").attr('src',link);
            $("#icon-team").css("display","block");
        },
        loadContent() {
            const params = {
                id: this.team_id
            };
            this.update_member = this.team_id;
            const req = new Request();
            req.request("get-team-info", params, (data) => {
                hideAllModal();
                this.fillData(data);
                this.getListMember();
            });
        },
        fillData(data) {
            const rc = parseInt(data.rc);
            if (rc === 0) {
                const item = data.item;
                if (item !== null && item !== undefined) {

                   this.update_team.name = item.name;
                   this.update_team.icon = item.icon;


                    if (this.update_team.team_icon !== "") {
                        $("#icon-team").css("display","block");
                    }

                    this.update_team_category = item.categories[0]._id;
                    this.update_team.categories.push(this.update_team_category);
                }
            }
        },

        onBtnUpdateTeam(){
            this.update_team.team_id = this.team_id;
            this.update_team.categories = [];
            this.update_team.categories.push(this.update_team_category);
            if (!checkInputString(this.update_team.name)) {
                showDialog("Notice", "Please enter name of team");
                return;
            }
            if(this.update_team.categories.length === 0)
            {
                showDialog("Notice", "Please pick categories of team");
                return;
            }
            console.log("Data add team :" + JSON.stringify(this.update_team));
            confirmDialog("Do you want update this team", "Yes", () => {
                this.updateTeam();
            });
        },
        updateTeam(){
            const req = new Request();
            req.update("update-team",this.update_team, (data) => {
                if (parseInt(data.rc) === 0) {
                    showDialog("Notice", "Update team success <br/>", null, () => {
                    });
                } else {
                    showDialog("Warning", "Update team failed <br/>" + data.rd);
                }
            });
        },
        getDefaultAddTeamData(){
            this.add_team.team_name = "";
            this.add_team.team_icon = "";
            this.add_team.categories = [];
            $("#icon-team").css("display","none");
        },
        onBtnAddMember(){
            if (!checkInputString(this.member_name)) {
                showDialog("Notice", "Please enter member name !");
                return;
            }else{
                this.addMember();
            }
            // if (this.add_member.team_id === "") {
            //     showDialog("Notice", " Not found Team ,Please search and choose name of team");
            //     return;
            // }

        },
        onBtnDeleteMember(member){
            confirmDialog("Do you want delete this member", "Yes", () => {
                const  req = new Request();
                const params = {
                    id: member._id
                };
                console.log("param delete : " + JSON.stringify(params));
                req.delete("member-delete",params, (data) => {
                    if (parseInt(data.rc) === 0) {
                        showDialog("Notice", "Delete member success <br/>", null, () => {
                            this.list_member.splice(this.list_member.indexOf(member), 1);
                        });
                    } else {
                        showDialog("Warning", "Delete member failed <br/>" + data.rd);
                    }
                })
            });

        },
        addMember(){
            this.add_member.member_names.push(this.member_name);
            this.add_member.team_id = this.team_id;
            console.log("Add mem :" + this.add_member);
            const req = new Request();
            req.post("add-member-request",this.add_member, (data) => {
                if (parseInt(data.rc) === 0) {
                    showDialog("Notice", "Add member success <br/>", null, () => {
                        this.resetData();
                        this.getListMember();
                    });
                } else {
                    showDialog("Warning", "Add member failed <br/>" + data.rd);
                }
            });
        },

        resetData(){
            this.add_member= {
                team_id: "",
                member_names: []
            };
            this.member_name = "";
        },
        autoComplete() {
            let thisTemp = this;
            $("#name-team-select").autocomplete({
                minLength: 0,
                source: this.listTeam,
                focus: function( event, ui ) {
                    $( "#name-team-select").val( ui.item.name);
                    return false;
                },
                select: function (event, ui) {
                    thisTemp.name_team_select = ui.item.name;
                    thisTemp.add_member.team_id = ui.item.team_id;
                    alert(JSON.stringify(thisTemp.name_team_select));
                    return false;
                }
            })
                .autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + "<img style='width: 100px;height: 75px' src='" + item.icon + "'>" + item.name + "</div>")
                    .appendTo(ul);
            };
        },
        onTeamNameKeyUp(keySearch){
            this.listTeam = [];
            this.searchTeamByName(keySearch);
            this.autoComplete();
        },
        searchTeamByName(keySearch){
            console.log('Key Video Search Value:', keySearch);
            if (checkInputString(keySearch)){
                keySearch = keySearch.trim();
                let params = {
                    keyword: encodeURIComponent(keySearch),
                };
                const req = new Request();
                req.requestNoModal("find-team-request",params, (data) => {
                    let datas = data.rows;
                    if (isArray(datas)) {
                        for(let i = 0 ; i < datas.length ; i ++){
                            let temp = {
                                value: datas[i].name,
                                name: datas[i].name,
                                team_id: datas[i]._id,
                                icon: datas[i].icon
                            };
                            this.listTeam.push(temp);
                        }
                    }
                    console.log("List team :  " + JSON.stringify(this.listTeam));
                });
            }
        },
    }
});