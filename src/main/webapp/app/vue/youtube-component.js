Vue.component('youtube-component', {
    template: `
        <div>
            <div class="row" style="margin-top: 20px">
                <div class="col-lg-8">
                    <video-component
                        ref = "video_component"
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
                            <label>Choose match parent</label>
                             <input type="text" id="searchMatchParent" class="form-control" v-model.lazy="match_parent_title"
                                 v-on:keyup="onMatchParentNameKeyUp($event.target.value)"  placeholder="search match parent ...">
                        </div>
                        <div class="form-group">
                            <!--<label>Information match parent</label>-->
                          <!--<ul class="cd-accordion-menu">-->
                            <!--<div v-for="item in dataTest" v-bind:id="item.name">-->
                                 <!--<tree-set :model="item"></tree-set>-->
                            <!--</div>-->
                          <!--</ul>-->
                          <div class="row">
                                <div class="col-sm-4">
                                    <label for="set_select">Select set:</label>
                                 
                                      <select style="width: auto" class="form-control" v-model.number="set_select" id="set_select">
                                        <option value="1" selected>1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                      </select>
                                </div>
                                <div class="col-sm-4">
                                    <label for="match_select">Select match:</label>
                                      
                                      <select style="width: auto" class="form-control" v-model.number="match_select" id="match_select">
                                        <option value="1" selected>1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="6">7</option>
                                      </select>
                                </div>
                          </div>
                       
                        </div>
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" id="title" class="form-control" v-model="title"
                                   placeholder="title ...">
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
                            <span v-for="option in options" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                                <label> <input :value="option.id"
                                               type="radio" v-model="create_request.categories"/> {{option.name}}</label>
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
                            <input type="button" v-on:click.prevent="onButtonCreateClick" class="btn btn-primary" value="Create content"/>
                        </div>
                    </div>
                        
                 </form>
                 
            </div>
            
            <!--<div>-->
                <!---->
                <!--<div class="row">-->
                    <!--<div class="col-lg-12">-->
                        <!--<ul class="list-group">-->
                            <!--<li class="list-group-item" v-for="comment in create_request.comments">-->
                                <!--<comment-item v-bind:comment="comment" v-on:deleted="onItemCommentDelete(comment.youtube_id)"/>-->
                            <!--</li>-->
                        <!--</ul>-->
                    <!--</div>-->
                <!--</div>-->
                <!---->
                <!--<div class="row" v-if="show_button_more">-->
                    <!--<div class="col-lg-12">-->
                        <!--<div class="form-group">-->
                            <!--<input type="button" v-on:click="getComment()" class="btn btn-primary"-->
                                   <!--value="More comment"/>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!---->
            <!--</div>-->
            
        </div>`,

    computed: {},

    data() {
        return {
            dataTest: [
                {
                    "set":1,
                    "matches":[
                        {
                            "match":1,
                            "id":"",
                            "title":"Aoe 1",
                            "thumb":["https://file.topshare.live/1531879929933_7b51247b-c4d6-477d-a16f-8cddf878951a.png"],
                            "tags":["lol","aoe"]
                        },
                        {
                            "match":2,
                            "id":"",
                            "title":"Aoe 2",
                            "thumb":["https://file.topshare.live/1531879929933_7b51247b-c4d6-477d-a16f-8cddf878951a.png"],
                            "tags":["lol"]
                        }
                    ]
                },
                {
                    "set":2,
                    "matches":[
                        {
                            "match":1,
                            "id":"",
                            "title":"LOL 1",
                            "thumb":["http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/png/256/Goomba.png"],
                            "tags":[]
                        },
                        {
                            "match":2,
                            "id":"",
                            "title":"LOL 2",
                            "thumb":["http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/png/256/Goomba.png"],
                            "tags":[]
                        }
                    ]
                }
            ],
            set_select: 1,
            match_select: 1,
            listLiveInfo: [],
            match_parent_id: "",
            match_parent_title: "",
            number_set: 1,
            title: "",
            content: "",
            tags: [],
            images: [],
            currentId: 0,
            videodata: '',
            thumblist: [],
            next_get_comment_token: "",
            show_button_more: false,
            // add update live info
            update_live_info: {
                parent_match_name: "",
                set_match_info: [],
                title: "",
                description: "",
                thumb: "",
                categories: [],
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
             // create request
            create_request: {
                parent_match_id: "",
                set: 1,
                match: 1,
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
                thumbs: []
            },
            //MinhDV
            total_time: 0,
            startAt: 0,
            endAt: 0,
            isTrim: false,
            statusCreateSet: false
        }
    },

    props: ['options', 'link'],

    watch: {
        link: function (newVal, oldVal) {
            this.resetDataUpload();
            this.getVideoInfo(this.link);
        },
        match_select: function () {
            if (this.match_parent_id === ""){
                alert("Please search and choose match parent before choose match !")
            }
            // check match exists
            let checkSetMatch = this.checkSetMatchExist();
            if(checkSetMatch){
                alert("Match already exists !");
            }
            alert("Check create Set : " + this.statusCreateSet);
        }
    },

    mounted() {
        this.update_live_info.set_match_info = this.dataTest;
        $('#dateTo').datetimepicker({
            locale: 'en',
            format: DATE_FORMAT
        });
        this._matchHeightThumbList();
        $("#dateTo").val(getFullDateTime(new Date()));
        this.getVideoInfo(this.link);
    },

    methods: {
        checkSetMatchExist(){
            let listSetMatch = this.update_live_info.set_match_info;
            for(let i = 0 ; i < listSetMatch.length ; i++){
                if(this.set_select === listSetMatch[i].set){
                    this.statusCreateSet = false;
                    let tempMatches = listSetMatch[i].matches;
                    for( let j = 0 ; j < tempMatches.length ; j++){
                        if (this.match_select === tempMatches[j].match){
                            return true;
                        }
                    }
                }
            }
            this.statusCreateSet = true;
            return false;
        },
        autoComplete() {
            let thisTemp = this;
            $("#searchMatchParent").autocomplete({
                minLength: 0,
                source: this.listLiveInfo,
                focus: function( event, ui ) {
                    $( "#searchMatchParent").val( ui.item.title);
                    return false;
                },
                select: function (event, ui) {
                    thisTemp.match_parent_title = ui.item.title;
                    //$( "#searchMatchParent").val( ui.item.title);
                    thisTemp.match_parent_id = ui.item.id;
                    thisTemp.update_live_info = ui.item;
                    //thisTemp.update_live_info = thisTemp.dataTest;
                    // alert(JSON.stringify(thisTemp.update_live_info));
                    return false;
                }
            })
                .autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + "<img style='width: 100px;height: 75px' src='" + item.thumb + "'>" + item.title + "</div>")
                    .appendTo(ul);
            };
        },
        onMatchParentNameKeyUp(keySearch){
            this.listLiveInfo = [];
            this.searchLiveInfoByName(keySearch);
            this.autoComplete();
        },
        searchLiveInfoByName(keySearch){
            console.log('Key Video Search Value:', keySearch);
            if (checkInputString(keySearch)){
                keySearch = keySearch.trim();
                let params = {
                    keyword: encodeURIComponent(keySearch),
                };
                const req = new Request();
                req.requestNoModal("find-posts-manager",params, (data) => {
                    let datas = data.rows;
                    if (isArray(datas)) {
                        for(let i = 0 ; i < datas.length ; i ++){
                            this.parent_match_id = datas[i]._id;
                            let temp = {
                                value: datas[i].title,
                                parent_match_name: datas[i].parent_match_name,
                                title: datas[i].title,
                                thumb: datas[i].thumb,
                                id: datas[i]._id,
                                description: datas[i].description,
                                status: datas[i].status,
                                score1: datas[i].score1,
                                score2: datas[i].score2
                            };
                            this.listLiveInfo.push(temp);
                        }
                    }
                    console.log("List live info :  " + JSON.stringify(this.listLiveInfo));
                });
            }
        },
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
                parent_match_id: "",
                set: "",
                match: "",
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
                thumbs: []
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
                //MinhDV - emit when data load done
                console.log('data duration= ' + data["contentDetails"]["duration"]);
                this.total_time = parseInt(data["contentDetails"]["duration"]);

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
            this.create_request.typepost = TYPE_POST_VIDEO;
            this.create_request.mediaStreamUrl = [];

            let duration = 0;
            const contentDetails = data.contentDetails;
            if (contentDetails !== undefined && contentDetails !== null) {
                duration = parseInt(contentDetails.duration);
            }
            this.create_request.duration = duration;

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
            this._matchHeightThumbList();
        },

        _matchHeightThumbList() {
            if ($('.list-thumb').length) {
                $('.list-thumb').matchHeight({
                    target: $('#video')
                });
            }
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
            if(this.create_request.categories.length === 0)
            {
                showDialog("Notice", "Please pick categories");
                return false;
            }

            this.create_request.name = this.title;
            this.create_request.originalContent = this.content;
            this.create_request.displayContent = this.content;
            this.create_request.parent_match_id = this.parent_match_id;
            this.create_request.set = this.set_select;
            this.create_request.match = this.match_select;

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
            req.post("youtube-create", this.create_request, (data) => {
                if (parseInt(data.rc) === 0) {
                    const id = data.id;
                this.createVideoTrimRequest(data.id);
                //this.updateLiveInfo(data.id);
                    showDialog("Notice", "Create content success <br/>", null, () => {
                        //MinhDV

            });
                        this.$emit("content-created", id);

                } else {
                    showDialog("Warning", "Create content failure <br/>" + data.rd);
                }
            });
        },
        updateLiveInfo(idVideo){
            let matchAdd = {
                match: this.match_select,
                id: idVideo,
                title: this.title,
                thumb: this.create_request.thumb,
                tags: this.create_request.tags
            };
            if (this.statusCreateSet){
                let setAdd = {
                    set: this.set_select,
                    matches:[
                        matchAdd
                    ]
                };
                this.update_live_info.set_match_info.push(setAdd);
            }else{
                let tempListSet = this.update_live_info.set_match_info;
                for(let i = 0 ; i < tempListSet.length ; i ++){
                    if (this.set_select === tempListSet[i].set){
                        tempListSet[i].push(matchAdd);
                    }
                }
            }
            console.log("Update live info : " + JSON.stringify(this.update_live_info));
            const req = new Request();
            req.update("update-live-info",this.update_live_info,(data)=>{
                if (parseInt(data.rc) === 0) {
                    console.log("update live info success !");
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