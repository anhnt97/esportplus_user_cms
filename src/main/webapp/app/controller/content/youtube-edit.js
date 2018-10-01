/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global video, moment, create_request, axios, TYPE_PAGE_VIDEO, TYPE_POST_LIVE, TYPE_PAGE_LIVE */

const app = new Vue({
    el: '#app',
    data: function (){
        return {
            cropClick: false,
            options: [],
            choose_cats: [],
            set_select: 1,
            match_select: 1,
            listLiveInfo: [],
            match_parent_id: "",
            match_parent_title: "",
            data_update: {
                parent_match_id: "",
                set: "",
                match: "",
                id: "",
                categories: [],
                name: "",
                displayContent: "",
                originalContent: "",
                streamUrl: [],
                mediaStreamUrl: [],
                thumb: [],
                creator: "",
                startTimeEffect: new Date(),
                tags: [],
                linkShare: "",
                thumbs: []
            },
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
            ok: false,
            post_id: "",
            start: 0,
            limit: 1000,
            total: 0,
            link: '',
            nextToken: '',
            viewers: [],
            comments: [],
            body: 'Your comment',
            count: 0,
            seen: true,

            // Thumb
            images: [],
            datas: [],
            currentId: 0,


            //
            videodata: "",
            thumblist: [],
            title: "",
            content: "",
            show_button_more: false,
            origin_video_url: "",

            //MinhDV
            total_time: 0,
            startAt: 0,
            endAt: 0,
            isTrim: false,
            set_select:1,
            match_select:1
        }
    },
    mounted() {
        $('#dateTo').datetimepicker({
            locale: 'en',
            format: DATE_FORMAT
        });
        this._matchHeightThumbList();
        const url = window.location.href.slice(window.location.href.indexOf('?') + 1);
        let postId = "";
        let typePost = TYPE_POST_VIDEO;
        if (url !== undefined && url !== null && url.trim().length > 0) {
            const obj = convertQueryStringToJson(url);
            if (obj !== null && obj !== undefined) {
                postId = obj.id;
                typePost = parseInt(obj.type_post);
            }
        }
        console.log("postId=" + postId + " typePost=" + typePost);
        this.getCategory(postId, typePost);
    },

    methods: {

        _matchHeightThumbList() {
            if ($('.list-thumb').length) {
                $('.list-thumb').matchHeight({
                    target: $('#video')
                });
            }
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
                    thisTemp.data_update.parent_match_id = ui.item.id;
                    thisTemp.update_live_info = ui.item;

                    console.log("On Select = " + JSON.stringify(ui.item));

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

                            let temp = {
                                value: datas[i].title,
                                title: datas[i].title,
                                thumb: datas[i].thumb,
                                id: datas[i]._id,
                            };
                            this.listLiveInfo.push(temp);
                        }
                    }
                    console.log("List live info :  " + JSON.stringify(this.listLiveInfo));
                });
            }
        },
        getCategory(postId, typePost) {

            let typePage = TYPE_PAGE_VIDEO;
            const req = new Request();
            const params = {
                start: 0,
                limit: 100000,
                type_page: typePage
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
                    this.loadContent(postId);
                }
            });
        },
        loadContent(postId) {
            this.post_id = postId;
            const params = {
                id: postId
            };
            this.data_update.id = postId;
            const req = new Request();
            req.request("content-detail", params, (data) => {
                hideAllModal();
                this.fillData(data);
            });
        },
        fillData(data) {
            const rc = parseInt(data.rc);
            if (rc === 0) {
                const item = data.item;
                if (item !== null && item !== undefined) {

                    //MinhDV - emit when data load done
                    this.total_time = parseInt(item.duration);
                    this.data_update.parent_match_id = item.parent_match_id;
                    this.title = item.name;
                    this.content = item.display_content;
                    this.origin_video_url = item.url;

                    // this.getLinkStream(this.origin_video_url);

                    // get parent match

                    // const req = new Request();
                    // req.requestNoModal("/liveinfo",this.parent_match_id, (data) => {
                    //     if(data.rc === 0){
                    //         this.match_parent_title = data.item.title;
                    //         this.update_live_info.set_match_info = data.item.set_match_info;
                    //     }
                    // });

                    const thumb = item.thumb;
                    if (isArray(thumb)) {
                        this.setImageThumb(thumb);
                    }
                    let video_url = "";
                    let source = parseInt(item.source);
                    if (source === SOURCE_TOPSHARE) {
                        const media_stream_url = item.media_stream_url;
                        if (isArray(media_stream_url)) {
                            for (let i = 0; i < media_stream_url.length; ++i) {
                                const sss = media_stream_url[i];
                                if (sss.url.indexOf("playlist.m3u8") !== -1) {
                                    video_url = sss.url;
                                    break;
                                }
                            }
                        }
                    } else {
                        const stream_url = item.stream_url;
                        if (isArray(stream_url)) {
                            if (stream_url.length > 0) {
                                video_url = stream_url[0].url;
                            }
                        }
                        //url_youtube
                    }

                    console.log("url = " + video_url);

                    if (checkInputString(video_url)) {
                        const video = document.getElementById("video");
                        if (source === SOURCE_TOPSHARE) {
                            if (Hls.isSupported()) {
                                const hls = new Hls();
                                hls.loadSource(video_url);
                                hls.attachMedia(video);
                                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                                    video.play();
                                });
                            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                                video.src = url_video;
                                video.addEventListener('canplay', function () {
                                    video.play();
                                });
                            }
                        } else {
                            video.src = video_url;
                        }
                    }

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

                    const cats_data = [];
                    const cats_origin = item.categories;
                    if (isArray(cats_origin)) {
                        for (let i = 0; i < cats_origin.length; ++i) {
                            const o = cats_origin[i];
                            cats_data.push(o._id);
                        }
                    }
                    this.data_update.categories = cats_data;

                    const start_time_effect = item.start_time_effect;
                    let date = new Date();
                    try {
                        date = new Date(start_time_effect);
                    } catch (e) {
                        console.error("e = " + e);
                    }
                    $('#dateTo').val(getFullDateTime(date));

                    this.getComments();

                    //update set- match

                    this.match_select = item["match"];
                    this.set_select = item["set"];
                    console.log("parent_match_id" + item["parent_match_id"]);
                    this.loadParentMatchid( item["parent_match_id"])

                }
            }
        },

        loadParentMatchid(parent_match_id) {
            console.log("loadParentMatchid" +parent_match_id);
            if(parent_match_id == null || parent_match_id == "")
                return;
            const params = {
                id: parent_match_id
            };
            const req = new Request();
            req.requestNoModal("get-posts-manager-info", params, (data) => {
                this.match_parent_title = data.item.title;

                let sets = data["item"]["sets"];

                for(let i = 0; i < sets.length; i++)
                {
                    let matches = sets[i]["matches"];
                    let set = sets[i]["set"];
                    for(let j = 0; j < matches.length;j ++)
                    {
                        let match_info = matches[j];
                        if(match_info["match_id"]== this.data_update.id)
                        {
                            this.set_select = set;
                            this.match_select = match_info["match"];
                            break;
                            break;
                        }
                    }
                }

                // this.data_update.id;//current post id

                // if(item.set_select != undefined && item.match_select != undefined)
                // {
                //     this.set_select = item.set_select;
                //     this.match_select = item.match_select;
                // }

            });
        },

        onItemCommentDelete(id) {
            console.log("id=" + id);
            const req = new Request();
            req.delete("comment-delete", {id: id, adminId: ""}, (data) => {
                let rc = parseInt(data.rc);
                if (rc === 0) {
                    showDialog("Notice", "Delete comment success", null, () => {
                        this.updateCommentDataRemove(id);
                    });
                } else {
                    showDialog("Warning", "Delete comment failed");
                }
            });
        },

        updateCommentDataRemove(id) {
            let index = -1;
            for (let i = 0; i < this.comments.length; i++) {
                if (this.comments[i]._id === id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                this.comments.splice(index, 1);
            }
        },

        getComments() {
            const params = {
                post_id: this.post_id,
                start: this.start,
                limit: this.limit
            };
            axios.get('comment-list', {params: params})
                .then((response) => {
                    this.ok = true;
                    var data = response.data;
                    console.log(response);
                    if (data !== null && data !== undefined) {
                        const rc = parseInt(data.rc);
                        if (rc === 2) {
                            this.show_button_more = false;
                        }
                        if (rc === 0) {
                            var items = data.rows;
                            if (isArray(items)) {
                                if (items.length > 0) {
                                    this.start += items.length;
                                    this.comments = this.comments.concat(items);
                                    this.count = this.comments.length;
                                }
                            }
                        }
                    }
                });
        },

        setImageThumb(imgs) {
            console.log(imgs);
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
                        this.datas = [];
                        for (let j = 0; j < rows.length; ++j) {
                            const b = rows[j];
                            b.edit = false;
                            this.thumblist.push(b);
                        }
                    }
                }
            });
        },

        onVideoLoadError() {
            console.log("video load error !!!");
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

        onBtnUpdateClick(e) {

            if (!checkInputString(this.title)) {
                showDialog("Notice", "Please enter title");
                return;
            }

            if (!checkInputString(this.content)) {
                showDialog("Notice", "Please enter description");
                return;
            }
            if(this.data_update.categories.length === 0)
            {
                showDialog("Notice", "Please pick categories");
                return;
            }

            let tags = $("#tags_id").val();
            if (!checkInputString(tags)) {
                tags = "";
            }
            var tags_data;
            if (tags === "") {
                tags_data = [];
            } else {
                tags_data = tags.split(",");
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

            if(this.data_update.parent_match_id != undefined && this.data_update.parent_match_id != "")
            {
                if(this.data_update.set == undefined ||
                this.data_update.match == undefined)
                {
                    showDialog("Notice", "Please pick set match");
                    return;
                }
            }

            this.data_update.name = this.title;
            this.data_update.originalContent = this.content;
            this.data_update.displayContent = this.content;
            // this.data_update.parent_match_id = this.parent_match_id;
            this.data_update.set = this.set_select;
            this.data_update.match = this.match_select;
            this.data_update.startTimeEffect = startTimeEffect;
            this.data_update.linkShare = "";
            this.data_update.tags = tags_data;

           // console.log("cat = " + JSON.stringify(this.data_update.categories));
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

            this.data_update.thumbs = thumb64;

            console.log(JSON.stringify(this.data_update));
            confirmDialog("Do you want edit this content", "Edit", () => {
                this.updateContent();
            });

        },

        updateContent() {
            this.createVideoTrimRequest(this.post_id);
            this.uploadSetMatch();
            const req = new Request();

            req.update("content-youtube-update", this.data_update, (data) => {
                if (parseInt(data.rc) === 0) {
                    showDialog("Notice", "Update content success <br/>", null, () => {
                    });
                } else {
                    showDialog("Warning", "Update content failed <br/>" + data.rd);
                }
            });
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

            var valueStart = (this.$refs.video_component.$refs.trim_component.$refs.input_start.textContent).replace(/(?:\r\n|\r|\n)/g, '');
            var valueEnd = (this.$refs.video_component.$refs.trim_component.$refs.input_end.textContent).replace(/(?:\r\n|\r|\n)/g, '');
            console.log(valueStart +"/"+ valueEnd);

            const req = new Request();
            if (this.isTrim === false) {
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

        },
        getLinkStream(originUrl)
        {
            var trim_req = {
                origin_url: originUrl,
                token: ""
            };
            const req = new Request();
            req.postHide("getlinkstream", trim_req, (data) => {
                if(parseInt(data.rc) === 0)
            {
                console.log(data);
            } else
            {
                console.log(data);
            }
        })
            ;
        },
        uploadSetMatch() {
            // private String parent_macth_id;
            // private String post_id;
            // private Integer set;
            // private Integer match;
            //set-match
            let param = {
                parent_macth_id:this.data_update.parent_match_id,
                post_id :this.post_id,
                set:this.set_select,
                match:this.match_select
            };
            const req = new Request();
            console.log(JSON.stringify(param));
            req.postHide("update-set", param, (data) => {
                if(parseInt(data.rc) === 0)
            {
                console.log("update set match request success");
            }
                else
            {
                console.log(data);
            }
        });
        }
    }

});
