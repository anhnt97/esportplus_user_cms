Vue.component('upload-image', {

    template: `<div>
        <div class="modal fade" ref="modal_list_users" id="modal_list_users" aria-labelledby="modal_list_users_title" role="dialog"
                 tabindex="-1">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" style="display: inline-block" id="modal_list_users_title">Upload image: </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="overflow-y: scroll; max-height: 100vh">
                 
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label"></label>
                                        <div class="col-sm-10">
                                            <div id="box-img">
                                                <div class="thumbnail">
                                                    <div class="bg-img img-thumbnail"
                                                         v-bind:style="{ 'background-image': 'url(' + base64_data + ')' }"
                                                         id="pic1">
                                                    </div>
                                                    <div id="loader" style="display: none">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <button @click.prevent="$refs.image_file.click()" class="btn btn-primary">Choose File</button>
                                    </div>
                                </div>
                                
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <input accept-charset="UTF-8" v-model="link" class="form-control" v-on:keyup="onTextChange" type="text" placeholder="Put image link here ..."/>
                                    </div>
                                </div>
                                
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <button @click.prevent="uploadImage" class="btn btn-success">Upload Image</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
                <input type="file" ref="image_file" style="display: none" @change="onFileChange"/>
            </div>
    </div>`,

    props: ['show', 'author'],

    data() {
        return {
            base64_data: "",
            selectedFile: null,
            timeout: -1,
            link: "",
        }
    },

    watch: {
        show: function (newVal, oldVal) {
            if (newVal) {
                this.reset();
                $("#modal_list_users").modal();
                this.link = "";
            } else {
                $("#modal_list_users").modal('hide');
            }
        }
    },

    mounted() {
        this.link = "";
        $("#loader").css("display","none");
        $(this.$refs.modal_list_users).on("hidden.bs.modal", this.close);
    },

    beforeDestroy() {
        if (this.timeout !== -1) {
            clearTimeout(this.timeout);
        }
    },

    methods: {

        onTextChange() {
            if (this.timeout !== -1) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => {
                $("#loader").css("display","block");
                this.getBase64FromLink(this.link);
            }, 800);
        },

        getBase64FromLink() {
            console.log("link: " + this.link);

            if (this.isURL(this.link)) {
                let imgs = {
                    url: this.link,
                    id: 100
                };
                let a = [];
                a.push(imgs);
                this.setImageThumb(a);
            }

        },

        setImageThumb(imgs) {
            const params = {
                rows: imgs
            };
            const req = new Request();
            req.postHide("img-service", params, (data) => {
                const rc = parseInt(data.rc);
                if (rc === 0) {
                    const rows = data.rows;
                    if (isArray(rows)) {
                        this.base64_data = rows[0].data;
                        $("#pic1").css("background-image", "url('" + this.base64_data + "')");
                    }
                    else {

                    }
                }
            });
            $("#loader").css("display","none");
        },

        isURL(str) {
            var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            return pattern.test(str);
        },

        reset() {
            this.base64_data = "";
        },

        onFileChange(e) {
            this.link = "";
            console.log("e: file change");
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

        readImage(file) {
            this.selectedFile = file;
            const input = this.$refs.image_file;
            if (input !== undefined && input !== null) {
                input.type = 'text';
                input.type = 'file';
            }
            let reader = new FileReader();
            reader.onload = (e) => {
                this.base64_data = e.target.result;
                $("#pic1").css("background-image", "url('" + this.base64_data + "')");
                hideAllModal();
                $("#loader").css("display","none");
            };
            reader.readAsDataURL(file);
            showLoading(true);
        },

        uploadImage() {
            if (this.base64_data.trim() === "" && this.link === "") {
                showDialog("Waring", "Please choose image !!!");
                return;
            }
            $("#modal_list_users").modal('hide');
            let params = {
                "data": this.base64_data,
                "create_by": this.author
            };

            //console.log("params: " + JSON.stringify(params));

            let api = new Request();
            api.post("upload-image", params, (res) => {
                console.log("result: " + JSON.stringify(res));
                hideAllModal();
                let rc = res.rc;
                if (rc === 0) {
                    let link = res.link;
                    this.$emit("upload_success", link);
                    $("#loader").css("display","none");
                    this.base64_data = "";

                    // $("#thumbnail-news").attr('src',link);
                    // $("#thumbnail-news").css("display","block");
                    showDialog("Notice", "Upload image success<br/>");
                } else {
                    showDialog("Warning", "Upload image failed<br/>" + res.rd);
                }
            });
        },

        close() {
            if (this.timeout !== -1) {
                clearTimeout(this.timeout);
            }
            this.$emit("close");
        }

    }
});