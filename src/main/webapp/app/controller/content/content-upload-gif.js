/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global TYPE_UPLOAD_LIVE */

const app = new Vue({

    el: '#app',

    data() {
        return {
            selectedFile: null,
            display_image: 'display: none;',
            fileInfo: ""
        }
    },

    mounted() {

    },
    methods: {
        onGifFileChange(e) {
            const files = e.target.files;
            if (!files) {
                showDialog("Warning", "File upload not supported by your browser.");
                return;
            }
            if (files && files[0]) {

                const file = files[0];
                const size = parseInt(file.size / 1048576);
                console.log("size = " + file.size / 1048576 + " MB");

                if (size > 200) {
                    showDialog("Notice", "File size maximum is 200 MB<br/> Your file <b>" + size + "</b> MB");
                    return;
                }
                if (!(/\.(gif)$/i).test(file.name)) {
                    showDialog("Notice", file.name + "<br/> Please choose gif file");
                    return;
                }
                this.fileInfo = file.name + " (" + size + " MB)";
                this.readImage(file);
            } else {
                showDialog("Warning", "Please choose gif file");
            }
        },
        readImage(file) {
            this.selectedFile = file;
            const input = this.$refs.chooseFileGif;
            if (input !== undefined && input !== null) {
                input.type = 'text';
                input.type = 'file';
            }
            var reader = new FileReader();
            const self = this;
            reader.onload = function (e) {
                self.display_image = 'display: block;';
                $('#blah').attr('src', e.target.result);
                hideAllModal();
            };
            reader.readAsDataURL(file);
            showLoading(true);

        },
        onUploadImageClick() {
            confirmDialog("Do you want upload this gif ?", "Upload", () => {
                this.upload();
            });
        },
        upload() {
            const fd = new FormData();
            fd.append("username", "daicadau");

            let fileName = this.selectedFile.name;
            fd.append(fileName, this.selectedFile);

            const req = new Request();
            req.uploadFile("uploadgif-service", fd, (data) => {
                const rc = data.rc;
                const rd = data.rd;
                if (parseInt(rc) === 0) {
                    showDialog("Notice", "Upload gif success", null, () => {
                        self.display_image = 'display: none;';
                        window.location.href = "upload?id=" + data.id + "&type_upload=" + TYPE_UPLOAD_LIVE + "&from=upload-gif";
                    });
                } else {
                    showDialog("Warning", "Upload gif failed <br/><b>" + rd + "</b>");
                }
            });
        }

    }

});

