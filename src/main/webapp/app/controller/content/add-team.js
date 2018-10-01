const addTeam = new Vue({
    el: "#add-team-app",
    data(){
        return {
            options: [],
            listTeam: [],
            show_form_upload: false,
            name_team_select: "",
            add_team_category: "",
            member_name: "",
            add_team:{
                team_name: "",
                team_icon: "",
                categories: []
            },
            add_member: {
                team_id: "",
                member_names: []
            }
        }
    },
    mounted(){
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
                        if(i == 0)
                        this.add_team_category = id;
                    }
                    // this.loadCategory(postId);
                }
            });
        },
        onUploadSuccess(urlImage){
            this.add_team.team_icon = urlImage;
            // $("#thumbnail-news").attr('src',link);
            $("#icon-team").css("display","block");
        },
        onBtnAddTeam(){
            this.add_team.categories.push(this.add_team_category);
            if (!checkInputString(this.add_team.team_name)) {
                showDialog("Notice", "Please enter name of team");
                return;
            }
            if(this.add_team.categories.length === 0)
            {
                showDialog("Notice", "Please pick categories of team");
                return;
            }
            console.log("Data add team :" + JSON.stringify(this.add_team));
            confirmDialog("Do you want add this team", "Yes", () => {
                this.addTeam();
            });
        },
        addTeam(){
            const req = new Request();
            req.post("add-team-request",this.add_team, (data) => {
                console.log("Data ve : " + JSON.stringify(data));
                if (parseInt(data.rc) === 0) {
                    showDialog("Notice", "Add team success <br/>", null, () => {
                        this.getDefaultAddTeamData();
                    });
                } else {
                    showDialog("Warning", "Add team failed <br/>" + data.rd);
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
            if (!checkInputString(this.name_team_select)) {
                showDialog("Notice", "Please search and choose name of team");
                return;
            }
            // if (this.add_member.team_id === "") {
            //     showDialog("Notice", " Not found Team ,Please search and choose name of team");
            //     return;
            // }
            confirmDialog("Do you want add this member", "Yes", () => {
                this.addMember();
            });
        },
        addMember(){
            this.add_member.member_names.push(this.member_name);
            const req = new Request();
            req.post("add-member-request",this.add_member, (data) => {
                if (parseInt(data.rc) === 0) {
                    showDialog("Notice", "Add member success <br/>", null, () => {
                        this.getDefaultAddTeamData();
                    });
                } else {
                    showDialog("Warning", "Add member failed <br/>" + data.rd);
                }
            });
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
        onChange(){
            console.log(this.add_team_category);
        }
    }
});