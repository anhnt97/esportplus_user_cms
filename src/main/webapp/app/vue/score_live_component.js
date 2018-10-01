/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Vue.component('score_component', {

    template: `

        <div id="score_div" xmlns="http://www.w3.org/1999/html">
            <div class="row">
                <div class="form-group"> 
                <label for="lblMode">Game Mode:</label>
                <input class="form-control" type="text" id="lblMode" ref = "lblMode" name="lblMode" 
                               placeholder="Game Mode" v-model="game_mode" style="width: auto">
                               </input>
                </div>
             
            </div>
            <div class="row">
            <span class="chat-img pull-left" style="margin-right: 20px">
                <img v-bind:src="imglink1"class="img-circle img-thumbnail" alt="avatar" style="width: 80px; height: 80px"/>
            </span>
            <div class="chat-body clearfix" style="overflow: hidden">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="header">
                            <label for="lblTeam1">Team 1:</label>
                            <input class="form-control" type="text" id="lblTeam1" ref = "lblTeam1" name="lblTeam1" placeholder="search name team 1" maxlength="50" size="20" v-model="team1"
                              v-on:keyup="onMemberNameKeyUp($event.target.value)" >
                            </input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                    <div><label for="lbAddTeam">Add Team:</label></div>
                    <div class="btn btn-primary" v-on:click.prevent="onClickAddTeam"> + </div>     
                    </div>
                     <div class="col-sm-2">
                     <label for="lblScore1">Score:</label>
               <input class="form-control" type="text" pattern="\\d*" maxlength="2" ref="lblScore1" id="lblScore1" 
                name="lblScore1" placeholder="Score" style="width: 50px;" v-model="score1">
                    </div>
                </div>
                
                <!--<div class="footer" style="margin-top: 10px">-->
                <!--<button v-on:click.prevent="onClickUpload1" class="btn btn-primary">-->
            <!--Upload Icon Team 1-->
            </button>
            <!--<upload-image @upload_success="onUploadSuccess($event)" :show="show_form_upload" -->
               <!--@close="onClose"></upload-image>           -->
            </div>
            </div>
            </div>
        
        
        <div class="row" style="margin-top: 20px">
            <span class="chat-img pull-left" style="margin-right: 20px">
                <img v-bind:src="imglink2"class="img-circle img-thumbnail" alt="avatar" style="width: 80px; height: 80px"/>
            </span>
            <div class="chat-body clearfix" style="overflow: hidden">
                <div class="row">
                <div class="col-sm-8">
                <label for="lblTeam2">Team 2:</label>
               <input  class="form-control" type="text" id="lblTeam2" ref = "lblTeam2" name="lblTeam2" placeholder="search name team 2" maxlength="50" size="20" v-model="team2"
                v-on:keyup="onMemberNameKeyUp($event.target.value)">
</div>          
                <div class="col-sm-2">
                    <div><label for="lbAddTeam">Add Team:</label></div>
                    <div class="btn btn-primary" v-on:click.prevent="onClickAddTeam"> + </div>     
                </div>
                <div class="col-sm-2">
                <label for="lblScore2">Score:</label>
               <input class="form-control" type="text" pattern="\\d*" maxlength="2" ref="lblScore2" id="lblScore2" name="lblScore2"
                placeholder="score" style="width: 50px;" v-model="score2">
               </input>
</div>
</div>
                <!--<div class="footer" style="margin-top: 10px">-->
                <!--<button v-on:click.prevent="onClickUpload2" class="btn btn-primary">-->
            <!--Upload Icon Team 2-->
            </button>
            <!--<upload-image @upload_success="onUploadSuccess($event)" :show="show_form_upload" -->
               <!--@close="onClose"></upload-image>-->
            </div>
                
            </div>
            
        </div>
   </div>
  `,
    props: ['show_form_upload', 'imglink1', 'imglink2','listTeam1','listTeam2'],
    data() {
        return {
            index_upload: 1,
            team1: "", team2: "", game_mode: "", score1: 0, score2: 0,
            listMember: [],
            listTeam1: [],
            listTeam2: []
        }
    },
    mounted() {
    },
    methods: {
        onUploadSuccess: function (link) {
            console.log(link + "///score::::::::::::" + this.index_upload);
            let object = {};
            object.link = link;
            object.index = this.index_upload;
            this.$emit("upload_thumb_success", object);
        },
        onClose: function () {
            this.$emit("close_thumb_upload");
        },
        onClickUpload1: function () {
            this.index_upload = 1;
            this.$emit("show_upload");
        },
        onClickUpload2: function () {
            this.index_upload = 2;
            this.$emit("show_upload");
        },
        onBtnUploadClick: function () {

        },
        onClickAddTeam(){
            let href = "add-team";
            window.open(href, '_blank');
            return false;
        },
        autoComplete() {
            let thisTemp = this;
            $("#lblTeam1").autocomplete({
                minLength: 0,
                source: this.listMember,
                focus: function( event, ui ) {
                    $( "#lblTeam1").val( ui.item.name);
                    return false;
                },
                select: function (event, ui) {
                    thisTemp.listTeam1 = [];
                    thisTemp.team1 = ui.item.name;
                    thisTemp.listTeam1.push(ui.item.member_id);
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
                source: this.listMember,
                focus: function( event, ui ) {
                    $( "#lblTeam2").val( ui.item.name);
                    return false;
                },
                select: function (event, ui) {
                    thisTemp.listTeam2 = [];
                    thisTemp.team2 = ui.item.name;
                    thisTemp.listTeam2.push(ui.item.member_id);
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
            this.listMember = [];
            this.searchMemberByName(keySearch);
            this.autoComplete();
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
                    console.log("List team :  " + JSON.stringify(this.listMember));
                });
            }
        },
    }

});
