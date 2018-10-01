
const editNews = new Vue({
    el: '#news-edit-app',
    data: {
        selectedFile: null,
        display_image: 'display: block;',
        cropClick: false,
        options: [],
        choose_cats: [],
        data_update: {
            id: "",
            categories: [],
            name: "",
            typepost: TYPE_POST_NEWS,
            status: 0,
            displayContent: "",
            originalContent: "",
            url: "",
            priority: 5,
            thumb: [],
            creator: "",
            share: 0,
            like: 0,
            dislike: 0,
            comment: 0,
            totalViews: 0,
            origin: 0,
            duration: 0,
            startTimeEffect: new Date(),
            tags: [],
            source:3,
            comments: [],
            thumbs: []
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

        thumblist: [],
        title: "",
        content: "",
        show_button_more: false,
        origin_video_url: "",
        show_form_upload: false,

        //
        total_time: 0,
        startAt: 0,
        endAt: 0,
        isTrim: false
    },

    mounted() {
        $('#dateTo').datetimepicker({
            locale: 'en',
            format: DATE_FORMAT
        });
        const url = window.location.href.slice(window.location.href.indexOf('?') + 1);
        let postId = "";
        let typePost = TYPE_POST_NEWS;
        if (url !== undefined && url !== null && url.trim().length > 0) {
            const obj = convertQueryStringToJson(url);
            if (obj !== null && obj !== undefined) {
                postId = obj.id;
                typePost = parseInt(obj.type_post);
            }
        }
        this.getInfoNews(postId);
        this.getCategory();
    },

    methods: {
        /**
         *  Get info post news
         * @param postId
         */
        getInfoNews(postId){
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
        /**
         *
         * @param data
         */
        fillData(data) {
            const rc = parseInt(data.rc);
            if (rc === 0) {
                // console.log(JSON.stringify(data));
                const item = data.item;
                if (item !== null && item !== undefined) {
                    this.total_time = parseInt(item.duration);
                    this.data_update.name = item.name;
                    this.data_update.displayContent = item.display_content;
                    this.data_update.originalContent = item.original_content;
                    // set original content

                    console.log("CONTENT = " + this.data_update.originalContent);
                    CKEDITOR.instances['originalContent'].setData(this.data_update.originalContent);


                    // CKEDITOR.instances['originalContent'].setData(this.data_update.originalContent);
                    // set tags
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
                    // set image thumbnail
                    const thumb = item.thumb;
                    if (thumb !== null || thumb === ""){
                        let thumb_item = thumb[0];
                        if(thumb_item != undefined)
                        $('#thumbnail-news').attr('src', thumb_item.url);
                    }else{
                        $('#thumbnail-news').hide();
                    }
                    // set category
                    const cats_data = [];
                    const cats_origin = item.categories;
                    if (isArray(cats_origin)) {
                        for (let i = 0; i < cats_origin.length; ++i) {
                            const o = cats_origin[i];
                            cats_data.push(o._id);
                        }
                    }
                    this.data_update.categories = cats_data;
                    // set date time
                    const start_time_effect = item.start_time_effect;
                    let date = new Date();
                    try {
                        date = new Date(start_time_effect);
                        console.log("Date time : " + date);
                    } catch (e) {
                        console.error("Datetime error = " + e);
                    }
                    $('#dateTo').val(getFullDateTime(date));
                }
            }
        },
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
                }
            });
        },
        onBtnUploadClick(e) {
            var title = $("#title").val();
            var content = CKEDITOR.instances['originalContent'].getData();
            var urlImageThumb = $('#thumbnail-news').attr('src');
            var tags = $("#tags_id").tagsinput('items');
            if (!checkInputString(title)) {
                showDialog("Notice", "Please enter title");
                return;
            }
            if (!checkInputString(this.data_update.displayContent)){
                showDialog("Notice", "Please enter description content");
                return;
            }
            if (!checkInputString(content)) {
                showDialog("Notice", "Please enter content");
                return;
            }
            if(this.data_update.categories.length === 0)
            {
                showDialog("Notice", "Please pick categories");
                return;
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
            this.data_update.thumb = [{
                "type":"default",
                "url": urlImageThumb,
                "width":640,
                "height":480
            }];
            this.data_update.originalContent = content;
            this.data_update.name = $("#title").val();
            this.data_update.startTimeEffect = startTimeEffect;
            this.data_update.tags = tags;
            console.log("content = " + JSON.stringify(this.data_update));

            confirmDialog("Do you want upload this content", "Yes", () => {
                this.updateNews();
            });

        },
        updateNews() {
            const req = new Request();
            console.log(this.data_update);
            req.update("update-news",this.data_update, (data) => {
                if (parseInt(data.rc) === 0) {
                    showDialog("Notice", "Upload content success <br/>", null, () => {
                    });
                } else {
                    showDialog("Warning", "Upload content failed <br/>" + data.rd);
                }
            });
        },
        onImageFileChange(e) {
            const files = e.target.files;
            if (!files) {
                showDialog("Warning", "File upload not supported by your browser.");
                return;
            }
            if (files && files[0]) {
                const file = files[0];
                const size = parseInt(file.size / 1048576);
                console.log("size = " + file.size / 1048576 + " MB");
                if (size > 5) {
                    showDialog("Notice", "File size maximum is 5 MB<br/> Your file <b>" + size + "</b> MB");
                    return;
                }
                this.readImage(file);
            } else {
                showDialog("Warning", "Please choose image file");
            }
        },
        onUploadImage(){

        },
        readImage(file) {
            this.selectedFile = file;
            const input = this.$refs.chooseImageThumbnail;
            if (input !== undefined && input !== null) {
                input.type = 'text';
                input.type = 'file';
            }
            let reader = new FileReader();
            const self = this;
            reader.onload = function (e) {
                self.display_image = 'display: block;';
                $('#thumbnail-news').attr('src', e.target.result);
                var images = [];
                images.push( e.target.result);
                hideAllModal();
            };
            // this.data_update.thumb = $('#thumbnail-news').attr('src');
            reader.readAsDataURL(file);
            showLoading(true);
        },
        onUploadSuccess(link){
            $("#thumbnail-news").attr('src',link);
            $("#thumbnail-news").css("display","block");
            emptyArray(this.data_update.thumbs);
            this.data_update.thumbs.push(link);
        }

    }

});