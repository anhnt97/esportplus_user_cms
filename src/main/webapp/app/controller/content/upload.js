/* global TYPE_POST_LIVE, DATE_FORMAT, moment, Hls, TYPE_UPLOAD_VIDEO, TYPE_POST_VIDEO, TYPE_PAGE_VIDEO, TYPE_UPLOAD_LIVE, TYPE_PAGE_LIVE */

$(function () {
    $('#dateTo').datetimepicker({
        locale: 'en',
        format: DATE_FORMAT
    });
});

const app = new Vue({

    el: '#app',

    data: {

        options: [],
        url_back: "list-pending",

        dataUpload: {
            uploadId: "",
            categories: [],
            name: "",
            displayContent: "",
            originalContent: "",
            typePost: TYPE_POST_LIVE,
            thumb: [],
            creator: "",
            startTimeEffect: "",
            tags: []
        },

        videodata: "",
        thumblist: [],
        title: "",
        content: "",
        currentId: 0,

    },

    mounted() {

        $("#dateTo").val(getFullDateTime(new Date()));
        this._matchHeightThumbList();

        const url = window.location.href.slice(window.location.href.indexOf('?') + 1);
        let id = "";
        let typeUpload = TYPE_UPLOAD_VIDEO;
        let from = "";
        if (url !== undefined && url !== null && url.trim().length > 0) {
            const obj = convertQueryStringToJson(url);
            if (obj !== null && obj !== undefined) {
                id = obj.id;
                typeUpload = parseInt(obj.type_upload);
                from = obj.from;
            }
        }
        console.log("id = " + id + ", typeUpload=" + typeUpload + ", from=" + from);
        this.getCategory(id, typeUpload, from);
    },

    methods: {

        getCategory(upload_id, typeUpload, from) {

            if (checkInputString(from)) {
                this.url_back = from;
            }

            let typePage = TYPE_PAGE_VIDEO;
            if (typeUpload === TYPE_UPLOAD_LIVE) {
                typePage = TYPE_PAGE_LIVE;
            }

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
                    for (let i = 0; i < rows.length; ++i) {
                        const obj = rows[i];
                        const title = obj.title;
                        const id = obj._id;
                        this.options.push({
                            id: id,
                            name: title
                        });
                    }
                    this.getData(upload_id);
                }
            });
        },

        _matchHeightThumbList() {
            if ($('.list-thumb').length) {
                $('.list-thumb').matchHeight({
                    target: $('#video')
                });
            }
        },

        onVideoLoadeddata(e) {
            this._matchHeightThumbList();
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

        getData(id) {

            this.dataUpload.uploadId = id;
            const req = new Request();

            req.get("get-pending-one", {id: id}, (data) => {
                const rc = parseInt(data.rc);
                if (rc === 0) {
                    const item = data.item;
                    const linkVideos = item.linkVideos;
                    let url_video = "";
                    if (isArray(linkVideos)) {
                        for (let i = 0; i < linkVideos.length; ++i) {
                            if (linkVideos[i].indexOf("playlist.m3u8") !== -1) {
                                url_video = linkVideos[i];
                                break;
                            }
                        }
                    }
                    if (url_video !== "") {
                        const video = document.getElementById('video');
                        if (Hls.isSupported()) {
                            const hls = new Hls();
                            hls.loadSource(url_video);
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
                    }

                    const typeUpload = item.typeUpload;
                    if (typeUpload === TYPE_UPLOAD_VIDEO) {
                        this.dataUpload.typePost = TYPE_POST_VIDEO;
                    } else {
                        this.dataUpload.typePost = TYPE_POST_LIVE;
                    }

                } else {
                    showDialog("Warning", "Get data failed. <br/> Please try again");
                }
            });

        },

        onButtonCreateClick(e) {

            if (!checkInputString(this.title)) {
                showDialog("Notice", "Please enter title");
                return false;
            }

            if (!checkInputString(this.content)) {
                showDialog("Notice", "Please enter content");
                return false;
            }

            var tags = $("#tags_id").val();
            console.log("tags = " + tags);
            if (!checkInputString(tags)) {
                tags = "";
            }
            console.log("tags = " + tags);

            var dateTo = $("#dateTo").val();
            console.log("dateTo = " + dateTo);
            let startTimeEffect = new Date();
            if (checkInputString(dateTo)) {
                try {
                    startTimeEffect = moment(dateTo, DATE_FORMAT).toDate();
                } catch (e) {
                    console.log("err:" + e);
                }
            }

            var tags_data;
            if (tags === "") {
                tags_data = [];
            } else {
                tags_data = tags.split(",");
            }

            this.dataUpload.name = this.title;
            this.dataUpload.originalContent = this.content;
            this.dataUpload.displayContent = this.content;
            this.dataUpload.tags = tags_data;
            this.dataUpload.startTimeEffect = startTimeEffect;

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
            this.dataUpload.thumb = thumb64;

            confirmDialog("Do you want update this content", "Create", () => {
                this.createContent();
            });

        },

        createContent() {
            const req = new Request();
            req.post("content-create", this.dataUpload, (data) => {
                var rc = parseInt(data.rc);
                if (rc === 0) {
                    showDialog("Notice", "Create content success");
                    window.history.back();
                    if (!checkInputString(this.url_back)) {
                        this.url_back = "list-pending";
                    }
                    window.location.href = this.url_back;
                } else {
                    showDialog("Warning", "Create content failed <br/>" + data.rd);
                }
            });
        },

    }
});













