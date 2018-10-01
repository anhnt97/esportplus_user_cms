Vue.component('facebook-component', {

    template: `
<div>

    <div class="row" style="margin-top: 20px">

        <div class="col-lg-8">
            <video-component
                    v-bind:video_data="videodata"
                    v-on:create-thumb="onThumbCreated($event)"
                    v-on:data-loaded="onVideoLoadeddata($event)"
                    v-bind:duration_data = "total_time"
                    v-on:trim_video = "onVideoTrim($event)"/>
        </div>

        <div class="col-lg-4">
            <div class="list-thumb" id="list-thumb" style="padding-bottom: 45px">
                <list-thumb-item v-bind:datas="thumblist"/>
            </div>
        </div>

    </div>

    <div class="row" style="margin-top: 20px">

        <form role="form">

            <div class="col-lg-12">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="title" class="form-control" v-model="title"
                           placeholder="title ..."/>
                </div>
                <div class="form-group">
                    <label>Content</label>
                    <textarea class="form-control" v-model="content" id="content" rows="10"
                              placeholder="content ..."></textarea>
                </div>
                <div class="form-group">
                    <label>Tags</label><br/>
                    <input type="text" id="tags_id" class="form-control" value="" data-role="tagsinput"/>
                </div>

            </div>

            <div class="col-lg-6">
                <label>Choose Categories</label>
                <div class="form-group" id="cat-1" style="max-height: 150px; overflow-y: scroll">
                    <row>
                                <span v-for="option in options" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                                    <label> <input :value="option.id"
                                                   type="checkbox" v-model="create_request.categories"/> {{option.name}}</label>
                                    <br/>
                                </span>
                    </row>
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
                    <input type="button" v-on:click.prevent="onButtonCreateClick" class="btn btn-primary"
                           value="Create content"/>
                </div>
            </div>

        </form>

    </div>

    <div>

        <div class="row">
            <div class="col-lg-12">
                <div style="display: inline-block;">
                    <span v-html="content_fb"></span> <a href="#" v-on:click.prevent="onChangePageClick">[{{link_fb}}]</a>
                </div>
            </div>
            
            <div class="col-lg-12" style="margin-top: 10px">
                <div v-for="page in fb_pages">
                    <label class="radio-inline"><input type="radio" v-bind:value="page.access_token" v-on:change="onPageSelected(page)" name="optradio"/>{{page.name}}</label>
                </div>
            </div>
        </div>

        <div class="row" style="margin-top: 20px">
            <div class="col-lg-12">
                <ul class="list-group">
                    <li class="list-group-item" v-for="comment in create_request.comments">
                        <comment-item v-bind:comment="comment"
                                      v-on:deleted="onItemCommentDelete(comment.facebook_id)"/>
                    </li>
                </ul>
            </div>
        </div>

        <div class="row" v-if="show_button_more">
            <div class="col-lg-12">
                <div class="form-group">
                    <input type="button" v-on:click="getComment()" class="btn btn-primary"
                           value="More comment"/>
                </div>
            </div>
        </div>

    </div>

</div>   
    `,

    data() {
        return {
            title: "",
            content: "",
            tags: [],
            images: [],
            current_id: 0,
            videodata: '',
            thumblist: [],
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
                source: SOURCE_FACEBOOK,
                tags: [],
                comments: [],
                thumbs: []
            },

            // Facebook
            fb_acc_name: "",
            fb_page_name: "",
            fb_page_token: "",
            timer: 0,
            content_fb: "",
            link_fb: "Login facebook",
            fb_pages: [],
            next_page_comment: "",

            //MinhDV
            total_time: 0,
            startAt: 0,
            endAt: 0,
            isTrim: false
        }
    },

    props: ['options', 'link'],

    watch: {
        link: function (newVal, oldVal) {
            this.resetDataUpload();
            this.getVideoInfo(this.link);
        }
    },

    beforeDestroy() {
        console.log('clear timer');
        if (!isNaN(this.timer)) {
            clearInterval(this.timer);
        }
    },

    computed: {},

    mounted() {
        $('#dateTo').datetimepicker({
            locale: 'en',
            format: DATE_FORMAT
        });
        this._getFacebookStatus();
        this._matchHeightThumbList();
        this._getFacebookInfo();
        $("#dateTo").val(getFullDateTime(new Date()));
        this.getVideoInfo(this.link);
    },

    methods: {

        resetDataUpload() {
            this.title = "";
            this.content = "";
            this.tags = [];
            this.images = [];
            this.current_id = 0;
            this.videodata = '';
            this.thumblist = [];
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
                source: SOURCE_FACEBOOK,
                tags: [],
                comments: [],
                thumbs: []
            };
            //MinhDV
            // this.total_time = 0;
            this.startAt = 0;
            this.endAt = 0;
            this.isTrim = false;


            $('#tags_id').tagsinput('removeAll');
        },

        _getAllPage(accessToken) {
            FB.api('/me', {
                fields: "id,name,picture,accounts{cover,name,picture.type(large),access_token}",
                access_token: accessToken
            }, (response) => {
                console.log("access: " + JSON.stringify(response));
            });
        },

        _getFacebookStatus() {
            FB.getLoginStatus((response) => {
                if (response.status === 'connected') {
                    const uid = response.authResponse.userID;
                    const accessToken = response.authResponse.accessToken;
                    const fbid = localStorage.getItem(FB_ACC_ID);
                    localStorage.setItem(FB_PAGE_TOKEN, accessToken);
                    this._getAllPage(accessToken);
                    if (fbid !== uid) {
                        this._clearFacebookInfo();
                    } else {
                        const expiresIn = response.expiresIn;
                        if (!isNaN(this.timer)) {
                            clearTimeout(this.timer);
                        }
                        if (!isNaN(expiresIn)) {
                            this.timer = setTimeout(() => {
                                this._clearFacebookInfo();
                            }, expiresIn * 1000);
                        }
                    }
                    console.log("fb: " + JSON.stringify(response));
                } else {
                    console.log("fb: not connected !");
                    this._clearFacebookInfo();
                }
            });
        },

        _clearFacebookInfo() {
            localStorage.setItem(FB_ACC_NAME, "");
            localStorage.setItem(FB_PAGE_NAME, "");
            localStorage.setItem(FB_PAGE_TOKEN, "");
            localStorage.setItem(FB_ACC_ID, "");
            localStorage.setItem(FB_ACC_IMG, "");
            this.fb_acc_name = "";
            this.fb_page_name = "";
            this.fb_page_token = "";
            this._buildContentLinkFacebook();
        },

        _getFacebookInfo() {
            const fbname = localStorage.getItem(FB_ACC_NAME);
            if (checkInputString(fbname)) {
                this.fb_acc_name = fbname;
            }
            const fbpagename = localStorage.getItem(FB_PAGE_NAME);
            if (checkInputString(fbpagename)) {
                this.fb_page_name = fbpagename;
            }
            const fbpagetoken = localStorage.getItem(FB_PAGE_TOKEN);
            if (checkInputString(fbpagetoken)) {
                this.fb_page_token = fbpagetoken;
            }
            this._buildContentLinkFacebook();
        },

        _buildContentLinkFacebook() {
            if (!checkInputString(this.fb_acc_name)) {
                this.content_fb = "Bạn chưa đăng nhập facebook, đăng nhập để lấy comment";
                this.link_fb = "Login";
            } else if (!checkInputString(this.fb_page_token)) {
                this.content_fb = "Bạn đang sử dụng tài khoản <font color=\"blue\"><b>" + this.fb_acc_name + "</b></font>, Vui lòng chọn page để lấy comment";
                this.link_fb = "Choose page";
            } else {
                this.content_fb = "Bạn đang sử dụng tài khoản <font color=\"blue\"><b>" + this.fb_acc_name + "</b></font>, page <font color=\"blue\"><b>" + this.fb_page_name + "</b></font> để lấy comment";
                this.link_fb = "Change page";
            }
        },

        onThumbCreated(e) {

        },

        onVideoLoadeddata(e) {
            this._matchHeightThumbList();
        },

        _matchHeightThumbList() {
            if ($('.list-thumb').length) {
                $('.list-thumb').matchHeight({
                    target: $('#video')
                });
            }
        },

        getVideoInfo(url) {
            console.log("url=" + url);
            if (checkInputString(url)) {
                const req = new Request();
                const params = {"u": url, access_token: this.fb_page_token};
                req.get("video/facebook", params, (data) => {
                    this.parseData(data, url);
                });
            }
        },

        parseData(data, url) {

            console.log(JSON.stringify(data));

            const error = data.error;
            if (error !== undefined && error !== null) {

                return;
            }

            if (data === null || data === undefined || checkJSONObject(data) === 0) {
                showDialog("Notice", "Get data failed. <br/> Please try again !");
                return;
            }

            const code = data.code;
            if (parseInt(code) === 150) {
                showDialog("Warning", "The video contains copyright content. <br/> Please choose other");
                return;
            }

            this.create_request.url = url;

            const picture = data.picture;
            if (checkInputString(picture)) {
                const obj = {
                    type: "standard",
                    height: 100,
                    width: 100,
                    url: picture
                };
                const thumb = [];
                thumb.push(obj);
                this.setImageThumb(thumb);
                this.create_request.thumb = thumb;
            }

            this.title = data.title;
            this.create_request.name = data.title;
            this.create_request.mediaStreamUrl = [];

            let duration = 0;
            const length = data.length;
            if (length !== undefined && length !== null && !isNaN(length)) {
                duration = Math.round(length);
            }
            this.create_request.duration = duration;

            this.create_request.share = 0;
            this.create_request.like = 0;
            this.create_request.dislike = 0;
            this.create_request.comment = 0;
            this.create_request.totalViews = 0;

            this.create_request.tags = [];
            let strTags = "";
            $('#tags_id').tagsinput("add", strTags);

            this.content = data.description;
            this.create_request.displayContent = data.description;
            this.create_request.originalContent = data.description;

            let url_video = "";
            const streams = data.source;
            if (checkInputString(streams)) {
                const ccc = {
                    "type": "video/mp4;+codecs=\"avc1.64001F,+mp4a.40.2\"",
                    "url": streams,
                    "quality": "hd720"
                };
                const array_stream = [];
                array_stream.push(ccc);
                this.create_request.streamUrl = array_stream;
                url_video = streams;
            } else {
                this.create_request.streamUrl = [];
            }

            if (url_video !== "") {
                this.videodata = url_video;
            }

            // getComment
            const comments = data.comments;
            if (comments !== null && comments !== undefined) {
                this.parsePagingData(comments);
                const cmt_data = comments.data;
                const cmt_tmp = this.parseCommentData(cmt_data);
                if (isArray(cmt_tmp)) {
                    this.create_request.comments = this.create_request.comments.concat(cmt_tmp);
                }
            }

            //MinhDV - emit when data load done
            console.log('data = ' + JSON.stringify(data));
            this.total_time =parseInt(duration);
        },

        parsePagingData(comments) {
            const paging = comments.paging;
            if (paging !== undefined && paging !== null) {
                let next = paging.next;
                if (checkInputString(next)) {
                    this.next_page_comment = next;
                    this.show_button_more = true;
                } else {
                    this.next_page_comment = "";
                    this.show_button_more = false;
                }
            }
        },

        parseCommentData(cmt_data) {
            const cmt_tmp = [];
            if (isArray(cmt_data)) {
                for (let i = 0; i < cmt_data.length; i++) {
                    var obj = cmt_data[i];
                    const from = obj.from;
                    if (from !== null && from !== undefined) {
                        var cmt = {};
                        var author = {};
                        author.acc_id = from.id;
                        author.acc_name = from.name;
                        author.acc_img = from.picture.data.url;
                        cmt.author = author;
                        cmt.comment_source = SOURCE_FACEBOOK;
                        cmt.comment = obj.message;
                        cmt.date = obj.created_time;
                        cmt.like = obj.like_count;
                        cmt.dislike = 0;
                        cmt.reply = obj.comment_count;
                        cmt.facebook_id = obj.id;
                        cmt_tmp.push(cmt);
                    }
                }
            }
            return cmt_tmp;
        },

        setImageThumb(imgs) {

            this.images = [];
            if (isArray(imgs)) {
                for (let i = 0; i < imgs.length; i++) {
                    let o = imgs[i];
                    o.id = this.current_id++;
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

        onButtonCreateClick() {

            if (!checkInputString(this.title)) {
                showDialog("Notice", "Please enter title");
                return false;
            }

            if (!checkInputString(this.content)) {
                showDialog("Notice", "Please enter description");
                return false;
            }

            if (this.create_request.streamUrl.length <= 0) {
                showDialog("Notice", "We can't get stream link of this video, please try again or another");
                return false;
            }

            this.create_request.name = this.title;
            this.create_request.originalContent = this.content;
            this.create_request.displayContent = this.content;

            let tags = $("#tags_id").val();
            if (!checkInputString(tags.trim())) {
                tags = "";
            }
            if (tags === "") {
                this.create_request.tags = [];
            } else {
                this.create_request.tags = tags.split(",");
            }

            this.create_request.tags = tags.split(",");

            const comment = this.create_request.comments.length;
            this.create_request.comment = comment;
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

            // console.log(JSON.stringify(this.create_request));

            confirmDialog("Do you want Create this content ?", "Create", () => {
                this.createContentFacebook();
            });

        },

        createContentFacebook() {
            const req = new Request();
            req.post("youtube-create", this.create_request, (data) => {
                if (parseInt(data.rc) === 0) {
                    const id = data.id;
                this.createVideoTrimRequest(data.id);
                    showDialog("Notice", "Create content success <br/>", null, () => {
                        //MinhDV
                        this.$emit("content-created", id);
                    });
                } else {
                    showDialog("Warning", "Create content failure <br/>" + data.rd);
                }
            });
        },

        onItemCommentDelete(id) {
            let index = -1;
            for (let i = 0; i < this.create_request.comments.length; i++) {
                if (this.create_request.comments[i].facebook_id === id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                this.create_request.comments.splice(index, 1);
            }
        },

        onChangePageClick() {
            console.log("Choose page facebook");
            facebookLogin((data) => {
                console.log(data);
                const name = data.name;

                const fbresp = parseDataFbLogin(data);
                this._getFacebookInfo();

                const accounts = data.accounts;
                if (accounts !== null && accounts !== undefined) {
                    const d = accounts.data;
                    if (isArray(d)) {
                        this.fb_pages = d;
                    }
                }
                if (this.fb_pages.length === 0) {
                    showDialog("Thông báo", "Tài khoản của bạn không quản lý page nào, có thể sẽ không lấy được commment của video này");
                } else {

                }
            });
        },

        onPageSelected(e) {
            const token = e.access_token;
            console.log("token: " + token);
            const fbpagetoken = localStorage.getItem(FB_PAGE_TOKEN);
            let change = false;
            if (token !== fbpagetoken) {
                localStorage.setItem(FB_PAGE_TOKEN, token);
                localStorage.setItem(FB_PAGE_NAME, e.name);
                change = true;
            }
            this._getFacebookInfo();

            // reload lai tu dau
            if (change) {
                this.reloadCommentWithOtherPage(token);
            }
        },

        reloadCommentWithOtherPage(token) {
            if (checkInputString(token)) {
                const req = new Request();
                const params = {"u": this.link, access_token: this.fb_page_token};
                req.get("video/facebook", params, (data) => {
                    this.create_request.comments = [];
                    const comments = data.comments;
                    console.log("data=" + JSON.stringify(data));
                    if (comments !== null && comments !== undefined) {
                        this.parsePagingData(comments);
                        const cmt_data = comments.data;
                        const cmt_tmp = this.parseCommentData(cmt_data);
                        if (isArray(cmt_tmp)) {
                            this.create_request.comments = this.create_request.comments.concat(cmt_tmp);
                        }
                    }
                });
            }
        },

        getComment() {
            if (checkInputString(this.next_page_comment)) {
                const req = new Request();
                req.get(this.next_page_comment, {}, (data) => {
                    if (data !== null && data !== undefined) {
                        this.parsePagingData(data);
                        const cmt_data = data.data;
                        const cmt_tmp = this.parseCommentData(cmt_data);
                        if (isArray(cmt_tmp)) {
                            this.create_request.comments = this.create_request.comments.concat(cmt_tmp);
                        }
                    }
                });
            }
        },

        //MinhDV
        onVideoTrim(e) {
            console.log(e);
            this.startAt = e.startAt;
            this.endAt = e.endAt;
            this.isTrim = e.trim_on;
        },
        createVideoTrimRequest(post_id) {
            console.log(post_id + " need trim");
            const req = new Request();


            var valueStart = (this.$refs.video_component.$refs.trim_component.$refs.input_start.textContent).replace(/(?:\r\n|\r|\n)/g, '');
            var valueEnd = (this.$refs.video_component.$refs.trim_component.$refs.input_end.textContent).replace(/(?:\r\n|\r|\n)/g, '');
            console.log(valueStart +"/"+ valueEnd);

            if (this.isTrim == false) {
                console.log(post_id + " don't need trim");
            } else {
                var trim_req = {
                    post_id: post_id,
                    startAt: valueStart,
                    endAt: valueEnd,
                    duration:this.total_time
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

        }
    }


});