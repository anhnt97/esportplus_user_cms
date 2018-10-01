Vue.component('upload-component', {

    template: `<div>

        <div class="row" style="margin-top: 20px">
            
            <div class="col-lg-8">
                <video-component
                        v-bind:video_data="videodata"
                        v-on:create-thumb="onThumbCreated($event)"
                        v-on:data-loaded="onVideoLoadeddata($event)"/>
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
                       <row>
                           <span v-for="option in options" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                               <label> <input :value="option.id"
                                              type="checkbox" v-model="data_upload.categories"/> {{option.name}}</label>
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
                       <input type="button" v-on:click.prevent="onButtonCreateClick" class="btn btn-primary" value="Create content"/>
                   </div>
               </div>
                   
            </form>
            
        </div>
          
    </div>`,

    props: ['file', 'file_type', 'options'],

    data() {
        return {
            title: "",
            content: "",
            currentId: 0,
            videodata: '',
            thumblist: [],
            data_upload: {
                categories: [],
                name: "",
                displayContent: "",
                originalContent: "",
                typepost: TYPE_POST_VIDEO,
                thumb: [],
                creator: "",
                startTimeEffect: new Date(),
                duration: 0,
                source: SOURCE_TOPSHARE,
                tags: []
            }
        }
    },

    mounted() {
        $('#dateTo').datetimepicker({
            locale: 'en',
            format: DATE_FORMAT
        });
        $('#tags_id').tagsinput();
        this._matchHeightThumbList();
        $("#dateTo").val(getFullDateTime(new Date()));
        this.readFile();
    },

    methods: {

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
            if (e.target !== null && e.target !== undefined) {
                if (!isNaN(e.target.duration)) {
                    this.data_upload.duration = parseInt(e.target.duration);
                }
            }
            this._matchHeightThumbList();
        },

        _matchHeightThumbList() {
            if ($('.list-thumb').length) {
                $('.list-thumb').matchHeight({
                    target: $('#video')
                });
            }
        },

        readFile() {
            let fileName = this.file.name;
            fileName = fileName.substring(0, fileName.lastIndexOf('.'));
            this.title = fileName;

            let reader = new FileReader();
            reader.onloadend = () => {
                this.videodata = URL.createObjectURL(this.file);
            };
            reader.readAsDataURL(this.file);
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

            confirmDialog("Do you want Upload this content ?", "Upload", () => {
                this.executeUpload();
            });

        },

        executeUpload() {
            this.data_upload.name = this.title;
            this.data_upload.originalContent = this.content;
            this.data_upload.displayContent = this.content;

            let tags = $("#tags_id").val();
            if (!checkInputString(tags)) {
                tags = "";
            }

            this.data_upload.tags = tags.split(",");

            const dateTo = $("#dateTo").val();
            let startTimeEffect = new Date();
            if (checkInputString(dateTo)) {
                try {
                    startTimeEffect = moment(dateTo, DATE_FORMAT).toDate();
                } catch (e) {
                    console.log("err:" + e);
                }
            }
            this.data_upload.startTimeEffect = startTimeEffect;

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

            this.data_upload.thumb = thumb64;

            const fd = new FormData();
            fd.append("form_info", JSON.stringify(this.data_upload));
            fd.append("mp4_file", this.file);

            const req = new Request();
            req.uploadFile("upload-video-content", fd, (data) => {
                const rc = data.rc;
                const rd = data.rd;
                if (parseInt(rc) === 0) {
                    const id = data.id;
                    showDialog("Notice", "Upload content success <br/>", null, () => {
                        this.$emit("content-created", id);
                    });
                } else {
                    showDialog("Warning", "Create content failure <br/><b>" + rd + "</b>");
                }
            });
        }

    }

});