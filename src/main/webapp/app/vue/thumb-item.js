Vue.component('thumb-item', {

    template: `
        <div>
        <img class="imgsss" v-bind:style="getOpacity" v-bind:src="image.data" v-on:click="onImageClick(image)" style="width: auto;"/>
             <div v-if="image.edit" class="tools">
                 <button type="button" v-on:click="onEditImageClick(image)" class="btn btn-primary">
                                            <i class="fa fa-edit"></i></button>
                 <button type="button" v-on:click="onRemoveImageClick(image.id)" class="btn btn-primary">
                                            <i class="fa fa-trash-o"></i></button>
             </div>
        </div>
    `,

    props: ['image'],

    data() {
        return {}
    },

    computed: {
        getOpacity() {
            return this.image.edit ? {opacity: 1} : {opacity: 0.5};
        }
    },

    methods: {

        onImageClick() {
            this.$emit("click");
        },

        onEditImageClick() {
            this.$emit("edit", this.image);
        },

        onRemoveImageClick() {
            this.$emit("remove");
        }

    }

});

Vue.component('list-thumb-item', {

    template: `<div>
        <div class="item" v-for="image in datas">
            <thumb-item 
                v-bind:image="image" 
                v-on:click="onThumbClick(image)" 
                v-on:edit="onEditImageClick($event)" 
                v-on:remove="onRemoveImageClick(image.id)" />
        </div>
        
        <button type="button"  v-on:click="onButtonChooseThumbClick()" class="btn btn-primary" style="width: calc(100% - 30px) ;position: absolute;bottom: 0">
            Custom thumbnail
        </button>
        
        <div class="modal fade" id="modalCrop" aria-labelledby="modalLabel" role="dialog" tabindex="-1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">Crop the image</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <img id="image" src="../docs/images/picture.jpg" alt="Picture">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click.prevent="btnCropClick()" class="btn btn-default"
                                data-dismiss="modal">Crop
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <input type="file" v-on:change="onFileThumbSelected" style="display:none;" ref="thumbnail"/>
    </div>`,

    props: ['datas'],

    data() {
        return {
            cropClick: false,
            currentId: 1000
        }
    },

    methods: {

        onThumbClick(image) {
            console.log("id = " + image.id);
            const id = image.id;
            for (let i = 0; i < this.datas.length; i++) {
                if (this.datas[i].edit && this.datas[i].id === id) {
                    this.datas[i].edit = false;
                } else {
                    this.datas[i].edit = this.datas[i].id === id;
                }
            }
        },

        onRemoveImageClick(e) {
            let index = -1;
            for (let i = 0; i < this.datas.length; ++i) {
                if (this.datas[i].id === e) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                try {
                    this.datas.splice(index, 1);
                } catch (e) {
                    console.error("e=" + e)
                }
            }
        },

        onEditImageClick(e) {
            console.log("edit choose: " + e.id);
            this.startCrop(e.data, e.id);
        },

        startCrop(imgData, idx) {
            const index = idx;
            console.log("start crop: " + index);
            // let $image = $('#image');
            $('#image').attr("src", imgData);
            $("#modalCrop").modal();
            $('#modalCrop').on('shown.bs.modal', () => {
                $("#image").cropper({
                    autoCropArea: 0.7,
                    zoomable: false,
                    viewMode: 1,
                });
            }).on('hidden.bs.modal', () => {
                if (this.cropClick) {
                    const imageData = $("#image").cropper('getCroppedCanvas').toDataURL();
                    console.log("before crop: " + index);
                    this.onImageCrop(imageData, index);
                }
                // $image.cropper('destroy');
                $("#image").cropper("destroy");
                this.cropClick = false;
            });
        },

        onImageCrop(data, id) {
            console.log("Crop at id: " + id);
            for (let i = 0; i < this.datas.length; i++) {
                const obj = this.datas[i];
                if (obj.id === id) {
                    obj.data = data;
                    break;
                }
            }
        },

        btnCropClick() {
            this.cropClick = true;
        },

        onButtonChooseThumbClick() {
            if (this.datas.length >= 5) {
                showDialog("Warning", "Maximum thumb is 5");
                return;
            }
            this.$refs.thumbnail.click();
        },

        onFileThumbSelected(e) {
            const files = e.target.files || e.dataTransfer.files;
            let errors = "";
            if (!files) {
                errors += "File upload not supported by your browser.";
            }
            console.log("files = " + files.length);
            if (files && files[0]) {
                let reader = new FileReader();
                let file = files[0];
                reader.onloadend = () => {
                    this.addImageThumb(reader.result);
                };
                reader.readAsDataURL(file);
            }
        },

        addImageThumb(data) {
            const img = {
                id: this.currentId++,
                data: data,
                edit: false
            };
            this.datas.push(img);
        },

    }

});