
const uploadNews = new Vue({
    el: '#upload-news-app',
    data: function () {
      return  {
          selectedFile: null,
          display_image: 'display: none;',
          cropClick: false,
          options: [],
          choose_cats: [],
          data_update_category: "",
          data_update: {
              categories: [],
              name: "",
              typepost: TYPE_POST_NEWS,
              status: 0,
              display_content: "",
              original_content: "",
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

          show_form_upload: false
      }
    } ,

    mounted() {
        $('#dateTo').val(moment().format(DATE_FORMAT));
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
        this.getCategory(postId,typePost);
    },

    methods: {
        getCategory(postId,typePost) {
            const req = new Request();
            let typePage = TYPE_PAGE_NEWS;
            if (typePost === TYPE_POST_LIVE) {
                typePage = TYPE_PAGE_LIVE;
            }
            if (typePost === TYPE_POST_VIDEO){
                typePage = TYPE_PAGE_VIDEO;
            }
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

                        // let  check_ed = "false";
                        // if(i == 0)
                        //     check_ed = "true";
                        this.options.push({
                            id: id,
                            name: title,
                        });
                        if(i == 0)
                        {
                            this.data_update_category = id;
                        }
                    }
                   // this.loadCategory(postId);
                }
            });
        },
        onBtnUploadClick(e) {
            emptyArray(this.data_update.categories);
            let content = CKEDITOR.instances['original_content'].getData();
            let urlImage = $('#thumbnail-news').attr('src');
            let tags = $("#tags_id").tagsinput('items');
            if (!checkInputString(this.data_update.name)) {
                showDialog("Notice", "Please enter title");
                return;
            }
            if (!checkInputString(this.data_update.display_content)){
                showDialog("Notice", "Please enter description content");
                return;
            }
            if (!checkInputString(content)) {
                showDialog("Notice", "Please enter content");
                return;
            }
            this.data_update.categories.push(this.data_update_category);
            if(this.data_update.categories.length === 0)
            {
                showDialog("Notice", "Please pick categories");
                return;
            }

            const dateTo = $("#dateTo").val();
            let startTimeEffect = new Date();

            if (checkInputString(dateTo)) {
                try {
                    startTimeEffect = moment(dateTo, DATE_FORMAT);
                } catch (e) {
                    console.log("err:" + e);
                }
            }
            this.data_update.thumb = [{
                "type":"default",
                "url": urlImage,
                "width":640,
                "height":480
            }];

            this.data_update.original_content = content;
            this.data_update.startTimeEffect = startTimeEffect;
            this.data_update.tags = tags;
            console.log("content = " + JSON.stringify(this.data_update));

            confirmDialog("Do you want upload this content", "Yes", () => {
                this.uploadNews();
            });

        },
        uploadNews() {
            const req = new Request();
                console.log("Data request : " + this.data_update);
            req.post("upload-news-service",this.data_update, (data) => {
                if (parseInt(data.rc) === 0) {
                    showDialog("Notice", "Upload content success <br/>", null, () => {
                        this.getDefaultData();
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
        },
        getDefaultData(){
            this.data_update.name = "";
            this.data_update.categories = [];
            this.data_update.typepost = TYPE_POST_NEWS;
            this.data_update.display_content = "";
            this.data_update.original_content = "";
            this.data_update.thumb = [];
            this.data_update.startTimeEffect = moment().format(DATE_FORMAT);
            $('#dateTo').val(moment().format(DATE_FORMAT));
            $('#thumbnail-news').hide();
            CKEDITOR.instances['original_content'].setData("");
            $("#tags_id").tagsinput('removeAll');
        }

    }

});