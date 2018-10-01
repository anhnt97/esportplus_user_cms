
Vue.component('livefinish-component', {

    template: `
        
        <div style="padding-left: 30px">
            
            <div class="row" style="margin-top: 20px">
                <score_component 
                ref="score_component"
                v-bind:imglink1 = "imageLink1"
                v-bind:imglink2 = "imageLink2"
                v-bind:show_form_upload = "isShow"
                v-on:show_upload="onClickUploadThumb"
                v-on:upload_thumb_success = "onThumbUploadSuccess($event)"
                v-on:close_thumb_upload="onCloseThumb">
                </score_component>
            </div>
            <!--<div class="row">-->
               <!--<div style="padding-left: -10px">-->
                    <!--<label for="">Số set:</label>-->
                        <!--<input type="text" id="select_set" class="form-control" v-model.number="select_set" value="1" placeholder="set ..." style="width: auto">-->
                 <!--</div>-->
            <!--</div>-->
            <br>
            
            <!--<div class="row">-->
            <!---->
              <!--<ul class="nav nav-tabs">-->
                <!--<li v-for="matches in data_set"  :class="{ active: matches.numberSet === activeTab }"><a data-toggle="tab" v-bind:href="'#set'+ matches.numberSet" v-on:click.prevent="activeTab = matches.numberSet">Set {{matches.numberSet}}</a></li>-->
              <!--</ul>-->
            <!---->
              <!--<div class="tab-content">-->
                <!--<div v-for="matches in data_set" class="tab-pane fade in" v-bind:id="'set' + matches.numberSet" :class="{ active: matches.numberSet === activeTab }">-->
                    <!--<set_live_component-->
                        <!--:matches="matches"-->
                    <!--&gt;-->
                    <!--</set_live_component>-->
                <!--</div>-->
                <!--</div>-->
            <!--</div>-->
             <div class="row" style="margin-top: 20px">
                <form role="form">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" id="title" class="form-control" v-model="create_request.title"
                               placeholder="title ...">
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-6">
                                <label>Image thumbnail</label>
                                <div>
                                    <div class="row">
                                        <div>
                                            <img style="display: none" id="thumbnail-news" src="#" alt="your image"/><br/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div style="margin-top: 20px; margin-left: 15px">
                                            <button v-on:click.prevent="clickUpload()"
                                                    class="btn btn-primary">
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <label>Choose Categories</label>
                                <div class="form-group" id="cat-1" style="max-height: 150px; overflow-y: auto">
                   
                                    <span v-for="option in options" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                                                <label><input :value="option.id"
                                                               type="checkbox" v-model="create_request.categories"/> {{option.name}}</label>
                                                <br/>
                                    </span>
                  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description Content</label>
                        <textarea rows="5" type="text" id="display_content" class="form-control"
                               v-model="create_request.description"
                               placeholder="description content ..."/>
                    </div>
                    <!--<div class="form-group">-->
                        <!--<label>Content</label>-->
                        <!--<textarea v-model="create_request.originalContent" class="form-control" id="original_content" rows="10" name="content"-->
                                  <!--placeholder="content ...">-->
                         <!--</textarea>-->
                    <!--</div>-->
                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-6">
                                <label>Tournaments</label>
                                <div class="form-group">
                                    <input type="text" id="tournaments" class="form-control"
                                           v-model="create_request.tournaments"
                                           placeholder="tournament content ...">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <label>Start effect time</label>
                                <div class="form-group">
                                    <input class="form-control datepicker" placeholder="dd/MM/yyyy" id="dateTo">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="button" v-on:click.prevent="onButtonCreateClick" class="btn btn-primary"
                               value="Create content"/>
                    </div>
                </form>
                <upload-image v-on:upload_success="onUploadThumbSuccess($event)" :show="show_up" @close="show_up=false"></upload-image>
            </div> 
        </div>`,

    computed: {},

    data() {
        return {
            activeTab: 1,
            select_set: 1,
            data_set: [
                {
                    numberSet: 1
                }
            ],
            images: [],
            currentId: 0,
            show_up: false,
            matches: [],
            create_request: {
                categories: [],
                parent_match_name: "",
                set_match_info: [],
                title: "",
                description: "",
                thumb: "",
                tournaments: "",
                creator: "",
                startTimeEffect: new Date(),
                status: 0,
                team1:"",
                team2:"",
                gameMode:"",
                iconTeam1:"",
                iconTeam2:"",
                score1:0,
                score2:0
            },
            //MinhDV
            total_time: 0,
            startAt: 0,
            endAt: 0,
            isTrim: false,
            isShow: false,
            imageLink1: "https://file.topshare.live/1531879929933_7b51247b-c4d6-477d-a16f-8cddf878951a.png",
            imageLink2: "https://file.topshare.live/1531879929933_7b51247b-c4d6-477d-a16f-8cddf878951a.png",
            name1: "",
            name2: "",
            gameMode: "",
            scoret1: 0,
            scoret2: 0,

        }
    },

    props: ['options', 'link'],

    watch: {
        select_set: function () {
            this.data_set = [];
            for(let i = 1 ; i <= this.select_set ; i++){
                let temp = {
                    numberSet: i
                };
                this.data_set.push(temp);
            }
        }
    },

    mounted() {
        console.log("on Mounted live finish");
        $("#dateTo").val(getFullDateTime(new Date()));

    },

    methods: {
        updateMatch: function (matches) {
            this.matches.push(matches);
            console.log("Matches :" + JSON.stringify(this.matches));
        },
        onChangeTab: function () {
            // console.log("Data tab 1: " + this.$refs.live_component)
        },
        clickUpload: function () {
            this.show_up = true;
            this.isShow = true;
            this.$refs.score_component.index_upload = 3;
            console.log("Click upload image");
        },
        onClickUploadThumb: function () {
            this.isShow = true;
        },
        onCloseThumb: function () {
            this.isShow = false;
        },
        onThumbUploadSuccess: function (event) {
            if (event.index === 1)
                this.imageLink1 = event.link;
            else if (event.index === 2)
                this.imageLink2 = event.link;
            else {
                $("#thumbnail-news").attr('src', event.link);
                $("#thumbnail-news").css("display", "block");
            }
            this.isShow = false;
        },
        // onSelectSet: function () {
        //     $("#thumbnail-news").attr('src', event.link);
        //     $("#thumbnail-news").css("display", "block");
        // },
        onButtonCreateClick() {
            this.namet1 = this.$refs.score_component.team1;
            this.namet2 = this.$refs.score_component.team2;
            this.gamemode = this.$refs.score_component.game_mode;
            this.scoret1 = this.$refs.score_component.score1;
            this.scoret2 = this.$refs.score_component.score2;

            if (!checkInputString(this.create_request.title)) {
                showDialog("Notice", "Please enter title");
                return false;
            }

            if (!checkInputString(this.create_request.description)) {
                showDialog("Notice", "Please enter description");
                return false;
            }

            if(this.create_request.categories.length === 0)
            {
                showDialog("Notice", "Please pick categories");
                return false;
            }
            if(!checkInputString(this.gamemode))
            {
                showDialog("Notice", "Please fill game mode");
                return false;
            }

            if(!checkInputString(this.namet1) || !checkInputString(this.namet2))
            {
                showDialog("Notice", "Please fill in the full name of the two teams");
                return false;
            }
            // set name,score team
            this.create_request.team1 = this.namet1;
            this.create_request.team2 = this.namet2;
            this.create_request.iconTeam1 = this.imageLink1;
            this.create_request.iconTeam2 = this.imageLink2;
            this.create_request.score1 = parseInt(this.scoret1);
            this.create_request.score2 = parseInt(this.scoret2);
            this.create_request.gameMode = this.gamemode;

            // set match info
            // let stringMatchInfo = "";
            // for(let i = 0 ; i < this.data_set.length ; i ++){
            //     let temp =  this.data_set[i];
            //     let arrTemp = Object.values(temp);
            //     for(let j = 1 ; j < arrTemp.length ; j++){
            //         if (j !== arrTemp.length - 1){
            //             stringMatchInfo += arrTemp[j] + ";"
            //         }
            //     }
            //     if (i !== this.data_set.length - 1){
            //         stringMatchInfo += "@";
            //     }
            // }
            // this.create_request.matchInfo = stringMatchInfo;
            // set tags
            // let tags = $("#tags_id").val();
            // if (!checkInputString(tags.trim())) {
            //     tags = "";
            // }
            //
            // if (tags === "") {
            //     this.create_request.tags = [];
            // } else {
            //     this.create_request.tags = tags.split(",");
            // }

            // set parent match name

            this.create_request.parent_match_name =  this.create_request.team1 + "_vs_" + this.create_request.team2
            + "_" + this.create_request.gameMode + "_" + this.create_request.tournaments;

            // set date time
            const dateTo = $("#dateTo").val();
            let startTimeEffect = new Date();
            if (checkInputString(dateTo)) {
                try {
                    startTimeEffect = moment(dateTo, DATE_FORMAT).toDate();
                } catch (e) {
                    console.log("err:" + e);
                }
            }
            this.create_request.startTimeEffect = startTimeEffect;

            // const thumb64 = [];
            // if (isArray(this.thumblist) && this.thumblist.length > 0) {
            //     for (let i = 0; i < this.thumblist.length; i++) {
            //         if (this.thumblist[i].edit) {
            //             thumb64.push(this.thumblist[i].data);
            //             break;
            //         }
            //     }
            //     if (thumb64.length === 0) {
            //         thumb64.push(this.thumblist[0].data);
            //     }
            // }
            //
            // this.create_request.thumbs = thumb64;

            this.create_request.thumb = $('#thumbnail-news').attr('src');
            let obj = JSON.stringify(this.create_request);
            console.log(obj);

            confirmDialog("Do you want Create this content ?", "Create", () => {
                this.createLiveInfoContent();
                this.resetDataUpload();
            });

        },
        createLiveInfoContent() {
            const req = new Request();
            req.post("create-live-info", this.create_request, (data) => {
                if (parseInt(data.rc) === 0) {
                    const id = data.id;
                    showDialog("Notice", "Create content success <br/>", null, () => {
                        //MinhDV

                    });
                    this.$emit("content-created", id);
                } else {
                    showDialog("Warning", "Create content failure <br/>" + data.rd);
                }
            });
        },
        resetDataUpload() {
            this.create_request = {
                parent_match_name: "",
                set_match_info: [],
                title: "",
                description: "",
                thumb: "",
                categories: [],
                tournaments: "",
                creator: "",
                startTimeEffect: new Date(),
                team1:"",
                team2:"",
                gameMode:"",
                iconTeam1:"",
                iconTeam2:"",
                score1:0,
                score2:0
            };
            //MinhDV
            // this.total_time = 0;
            this.startAt = 0;
            this.endAt = 0;
            this.isTrim = false;
            this.imageLink1 = "https://file.topshare.live/1531879929933_7b51247b-c4d6-477d-a16f-8cddf878951a.png";
            this.imageLink2 = "https://file.topshare.live/1531879929933_7b51247b-c4d6-477d-a16f-8cddf878951a.png";
            this.name1 = "";
            this.name2 =  "";
            this.gameMode = "";
            this.scoret1 =  0;
            this.scoret2 = 0;
        },
    }

});