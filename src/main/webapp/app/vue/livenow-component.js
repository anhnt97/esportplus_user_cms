Vue.component('livenow-component', {

    template: `
    <div id="live_component">
    <div class="row" style="margin-top: 20px ; padding-left: 15px">
        <div class="col-lg-8">
            <score_component 
            ref="score_component"
            v-bind:imglink1="imageLink1" 
            v-bind:imglink2="imageLink2" 
            v-bind:show_form_upload="isShow"
            v-on:show_upload="onClickUploadThumb" 
            v-on:upload_thumb_success="onThumbUploadSuccess($event)"
            v-on:close_thumb_upload="onCloseThumb">
            </score_component>
        </div>
        <div class="col-lg-4">
            <div class="list-thumb-live" id="list-thumb" style="padding-bottom: 45px ; height: 250px">
                <list-thumb-item v-bind:datas="thumblist"/>
            </div>
        </div>

    </div>

    <div class="row" style="margin-top: 20px">

        <form role="form">

            <div class="col-lg-12">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="title" class="form-control" v-model="title" placeholder="title ...">
                </div>
                <div class="form-group">
                    <label>Content</label>
                    <textarea class="form-control" v-model="content" id="content" rows="10" placeholder="content ..."></textarea>
                </div>
                <div class="form-group">
                    <label>Tags</label>
                    <br/>
                    <input type="text" id="tags_id" class="form-control" value="" data-role="tagsinput" />
                </div>
            </div>

            <div class="col-lg-6">
                <label>Choose Categories</label>
                <div class="form-group" id="cat-1" style="max-height: 150px; overflow-y: auto">
                   
                        <span v-for="option in options" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                                    <label> <input :value="option.id"
                                                   type="checkbox" v-model="create_request.categories"/> {{option.name}}</label>
                                    <br/>
                        </span>
                  
                </div>
            </div>

            <div class="col-lg-6">
                <label>Start effect time</label>
                <div class="form-group">
                    <input class="form-control datepicker" placeholder="dd/MM/yyyy" id="dateTo">
                </div>
            </div>

            <div class="col-lg-12">
                <div class="form-group">
                    <input type="button" v-on:click.prevent="onButtonCreateClick" class="btn btn-primary" value="Create content" />
                </div>
            </div>

        </form>

    </div>
</div>
    `,

    computed: {},

    data() {
        return {
            title: "",
            content: "",
            tags: [],
            images: [],
            currentId: 0,
            videodata: '',
            thumblist: [],
            next_get_comment_token: "",
            show_button_more: false,
            create_request: {
                categories: [],
                name: "",
                displayContent: "",
                originalContent: "",
                typepost: TYPE_POST_VIDEO,
                url: "",
                streamUrl: [],
                mediaStreamUrl: [],
                thumb: [],
                creator: "",
                share: 0,
                like: 0,
                dislike: 0,
                comment: 0,
                totalViews: 0,
                startTimeEffect: new Date(),
                duration: 0,
                source: SOURCE_YOUTUBE,
                tags: [],
                comments: [],
                thumbs: [],
                //MinhDV - only streaming type -- 22/7/2018
                matchInfo:"",
                liveType:0,
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
            namet1:"",
            namet2:"",
            scoret1:0,
            scoret2:0,
            gamemode:"",
        }
    },

    props: ['options', 'link'],

    watch: {
        link: function (newVal, oldVal) {
            this.resetDataUpload();
            this.getVideoInfo(this.link);
        }
    },

    mounted() {
        $('#dateTo').datetimepicker({
            locale: 'en',
            format: DATE_FORMAT
        });
        this._matchHeightThumbList();
        $("#dateTo").val(getFullDateTime(new Date()));
        this.getVideoInfo(this.link);
    },

    methods: {
        resetDataUpload() {
            this.title = "";
            this.content = "";
            this.tags = [];
            this.images = [];
            this.currentId = 0;
            this.videodata = '';
            this.thumblist = [];
            this.next_get_comment_token = "";
            this.show_button_more = false;
            this.create_request = {
                categories: [],
                name: "",
                displayContent: "",
                originalContent: "",
                typepost: TYPE_POST_VIDEO,
                url: "",
                streamUrl: [],
                mediaStreamUrl: [],
                thumb: [],
                creator: "",
                share: 0,
                like: 0,
                dislike: 0,
                comment: 0,
                totalViews: 0,
                startTimeEffect: new Date(),
                duration: 0,
                source: SOURCE_YOUTUBE,
                tags: [],
                comments: [],
                thumbs: [],
                //MinhDV - only streaming type -- 22/7/2018
                matchInfo:"",
                liveType:0,
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


            $('#tags_id').tagsinput('removeAll');
        },

        getVideoInfo(url) {
            console.log("url=" + url);
            if (checkInputString(url)) {
                let req = new Request();
                let params = {"u": url};
                req.get("video/basic-info", params, (data) => {
                    this.parseData(data, url);
            });
            }
        },

        parseData(data, url) {

            console.log("data = " + JSON.stringify(data));

            if (data === null || data === undefined || checkJSONObject(data) === 0) {
                showDialog("Notice", "Get data fail <br/> Please try again !");
                return;
            }

            const code = data.code;
            if (parseInt(code) === 150) {
                showDialog("Warning", "The video contains copyright content. <br/> Please choose other");
                return;
            }

            this.create_request.url = url;

            let thumbnails = data.thumbnails;
            if (thumbnails !== null && thumbnails !== undefined) {
                let thumb = [];
                for (let key in thumbnails) {
                    let obj = {};
                    if (thumbnails.hasOwnProperty(key)) {
                        obj.type = key;
                        obj.height = thumbnails[key].height;
                        obj.width = thumbnails[key].width;
                        obj.url = thumbnails[key].url;
                        thumb.push(obj);
                    }
                }
                thumb.sort((a, b) => {
                    return a.width < b.width
                });

                this.setImageThumb(thumb);
                this.create_request.thumb = thumb;
            }

            this.title = data.title;
            this.create_request.name = data.title;
            this.create_request.typepost = TYPE_POST_LIVE;
            this.create_request.mediaStreamUrl = [];

            const contentDetails = data.contentDetails;
            if (contentDetails !== undefined && contentDetails !== null) {
                const statistics = data.statistics;
                this.create_request.share = 0;
                if (statistics !== null && statistics !== undefined) {
                    this.create_request.like = statistics.likeCount;
                    this.create_request.dislike = statistics.dislikeCount;
                    this.create_request.comment = statistics.commentCount;
                    this.create_request.totalViews = statistics.viewCount;
                } else {
                    this.create_request.like = 0;
                    this.create_request.dislike = 0;
                    this.create_request.comment = 0;
                    this.create_request.totalViews = 0;
                }
            }

            this.create_request.tags = [];
            let strTags = "";
            const tags = data.tags;
            if (tags !== undefined && tags !== null && isArray(tags)) {
                this.create_request.tags = tags;
                if (tags.length > 0) {
                    for (let i = 0; i < tags.length; i++) {
                        if (i > 0) {
                            strTags += ",";
                        }
                        strTags += tags[i];
                    }
                }
            }

            $('#tags_id').tagsinput('removeAll');
            $('#tags_id').tagsinput("add", strTags);

            this.content = data.description;
            this.create_request.displayContent = data.description;
            this.create_request.originalContent = data.description;

            let url_video = "";
            const streams = data.stream;
            if (isArray(streams)) {
                this.create_request.streamUrl = streams;
                if (streams.length > 0) {
                    url_video = streams[0].url;
                }
            } else {
                this.create_request.streamUrl = [];
            }

            if (url_video !== "") {
                this.videodata = url_video;
            }

            this.getComment();

        },

        setImageThumb(imgs) {

            this.images = [];
            if (isArray(imgs)) {
                for (let i = 0; i < imgs.length; i++) {
                    let o = imgs[i];
                    o.id = this.currentId++;
                    this.images.push(o);
                }
            }

            const params = {
                rows: this.images
            };
            const req = new Request();
            req.postHide("img-service", params, (data) => {
                const rc = parseInt(data.rc);
            if (rc === 0) {
                const rows = data.rows;
                if (isArray(rows)) {
                    this.thumblist = [];
                    for (let j = 0; j < rows.length; ++j) {
                        const b = rows[j];
                        b.edit = false;
                        this.thumblist.push(b);
                    }
                }
            }
        });
        },

        onThumbCreated(e) {
            if (this.thumblist.length >= 5) {
                showDialog("Warning", "Maximum thumb is 5");
                return;
            }

            const img = {
                id: this.currentId++,
                data: e,
                edit: false
            };

            this.thumblist.push(img);
        },

        onVideoLoadeddata(e) {
            //this._matchHeightThumbList();
        },

        _matchHeightThumbList() {
            if ($('.list-thumb').length) {
                $('.list-thumb').matchHeight({
                    target: $('#video')
                });
            }
        },

        onButtonCreateClick() {
            this.namet1 = this.$refs.score_component.team1;
            this.namet2 = this.$refs.score_component.team2;
            this.gamemode = this.$refs.score_component.game_mode;
            this.scoret1 = this.$refs.score_component.score1;
            this.scoret2 = this.$refs.score_component.score2;

            if (!checkInputString(this.title)) {
                showDialog("Notice", "Please enter title");
                return false;
            }

            if (!checkInputString(this.content)) {
                showDialog("Notice", "Please enter description");
                return false;
            }

            if(this.create_request.categories.length == 0)
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

            this.create_request.name = this.title;
            this.create_request.originalContent = this.content;
            this.create_request.displayContent = this.content;
            this.create_request.team1 = this.namet1;
            this.create_request.team2 = this.namet2;
            this.create_request.iconTeam1 = this.imageLink1;
            this.create_request.iconTeam2 = this.imageLink2;
            this.create_request.score1 = parseInt(this.scoret1);
            this.create_request.score2 = parseInt(this.scoret2);
            this.create_request.gameMode = this.gamemode;
            this.create_request.matchInfo = "";

            let tags = $("#tags_id").val();
            if (!checkInputString(tags.trim())) {
                tags = "";
            }

            if (tags === "") {
                this.create_request.tags = [];
            } else {
                this.create_request.tags = tags.split(",");
            }

            const comment = this.create_request.comment;
            if (this.create_request.share === 0 && !isNaN(comment)) {
                this.create_request.share = parseInt(Math.sqrt(comment) * 12 * comment);
            }

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

            const thumb64 = [];
            if (isArray(this.thumblist) && this.thumblist.length > 0) {
                for (let i = 0; i < this.thumblist.length; i++) {
                    if (this.thumblist[i].edit) {
                        thumb64.push(this.thumblist[i].data);
                        break;
                    }
                }
                if (thumb64.length === 0) {
                    thumb64.push(this.thumblist[0].data);
                }
            }

            this.create_request.thumbs = thumb64;
            var obj = JSON.stringify(this.create_request);
            console.log(obj);

            confirmDialog("Do you want Create this content ?", "Create", () => {
                this.createContentYoutube();
        });

        },

        createContentYoutube() {

            const req = new Request();
            req.post("livestreaming-create", this.create_request, (data) => {
                if (parseInt(data.rc) === 0) {
                const id = data.id;
                showDialog("Notice", "Create content success <br/>", null, () => {
                    //MinhDV

                });``
                this.$emit("content-created", id);

            } else {
                showDialog("Warning", "Create content failure <br/>" + data.rd);
            }
        });
        },

        getComment() {
            console.log("next: " + this.next_get_comment_token);
            if (this.next_get_comment_token !== null && this.next_get_comment_token !== undefined) {
                var link = this.link; //video/comment?u=url[&n=nextPageToken]
                link += "[n=" + this.next_get_comment_token + "]";
                axios.get('video/comment', {params: {u: this.link, n: this.next_get_comment_token}})
                    .then((response) => {
                    console.log(JSON.stringify(response));
                this.ok = true;
                var data = response.data;
                if (data !== null && data !== undefined) {
                    this.next_get_comment_token = data.nextPageToken;
                    console.log("resp next_get_comment_token: " + this.next_get_comment_token);
                    if (!checkInputString(this.next_get_comment_token)) {
                        this.show_button_more = false;
                    } else {
                        this.show_button_more = true;
                    }
                    var items = data.items;
                    if (isArray(items)) {
                        var cmt_tmp = [];
                        for (var i = 0; i < items.length; ++i) {
                            var obj = items[i];
                            var cmt = {};
                            var author = {};
                            author.acc_id = obj.author.authorChannelId;
                            author.acc_name = obj.author.authorDisplayName;
                            author.acc_img = obj.author.authorProfileImageUrl;
                            cmt.author = author;
                            cmt.comment_source = SOURCE_YOUTUBE;
                            cmt.comment = obj.textOriginal;
                            cmt.date = obj.updatedAt;
                            cmt.like = obj.likeCount;
                            cmt.dislike = 0;
                            cmt.reply = obj.totalReplyCount;
                            cmt.youtube_id = obj.id;
                            cmt_tmp.push(cmt);
                        }
                        this.create_request.comments = this.create_request.comments.concat(cmt_tmp);
                    }
                }
                console.log("this.link = " + this.link);
                console.log("this.comments = " + JSON.stringify(this.create_request.comments));
            });
            }
        },

        onItemCommentDelete(id) {
            console.log("id = " + id);
            let index = -1;
            for (let i = 0; i < this.create_request.comments.length; ++i) {
                if (this.create_request.comments[i].youtube_id === id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                this.create_request.comments.splice(index, 1);
            }
        }
        ,
        //MinhDV
        onVideoTrim(e) {
            console.log(e);
            this.startAt = e.startAt;
            this.endAt = e.endAt;
            this.isTrim = e.trim_on;
        },
        createVideoTrimRequest(post_id) {
            console.log(post_id + " need trim");

            var valueStart = (this.$refs.video_component.$refs.trim_component.$refs.input_start.textContent).replace(/(?:\r\n|\r|\n)/g, '');
            var valueEnd = (this.$refs.video_component.$refs.trim_component.$refs.input_end.textContent).replace(/(?:\r\n|\r|\n)/g, '');
            console.log(valueStart +"/"+ valueEnd);

            const req = new Request();
            if (this.isTrim == false) {
                console.log(post_id + " don't need trim");
            } else {
                var trim_req = {
                    post_id: post_id,
                    startAt: valueStart,
                    endAt: valueEnd
                };

                req.postHide("trim-video", trim_req, (data) => {

                    if(parseInt(data.rc) === 0)
                {
                    console.log("send trim request success");
                } else
                {
                    console.log(data);
                }
            })
                ;
            }

        },
        //MinhDV
        onVideoTrim(e) {
        },
        onClickUploadThumb () {
            this.isShow = true;
        },
        onThumbUploadSuccess(event) {
            if (event.index == 1)
                this.imageLink1 = event.link;
            else
                this.imageLink2 = event.link;
            this.isShow = false;
        },
        onCloseThumb(){
            this.isShow = false;
        }
    }

});