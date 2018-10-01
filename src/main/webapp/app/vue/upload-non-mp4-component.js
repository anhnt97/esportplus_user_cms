Vue.component('upload-non-mp4-component', {

    template: `<div>Welcome</div>`,

    mounted() {
        console.log("upload video non mp4 component mounted !");
        this.upload();
    },

    props: ['file', 'file_type', 'options'],

    watch: {
        file: function (newVal, oldVal) {
            this.upload();
        }
    },

    methods: {

        upload() {

            let fileName = this.file.name;
            console.log("file name = " + fileName);

            const size = parseInt(this.file.size / 1048576);

            let notf = "Do you want upload file: <br/><b>";
            notf += fileName + "</b><br/>";
            notf += size + " MB </b>";

            confirmDialog(notf, "Upload", () => {

                const dataUpload = {
                    name: fileName,
                    source: SOURCE_TOPSHARE
                };

                const fd = new FormData();
                fd.append("form_info", JSON.stringify(dataUpload));
                fd.append("file_video", this.file);

                const req = new Request();
                req.uploadFile("nmp4-service", fd, (data) => {
                    const rc = data.rc;
                    const rd = data.rd;
                    if (parseInt(rc) === 0) {
                        showDialog("Notice", "Upload File Sucess <br/>", null, () => {
                            window.location.href = "upload?id=" + data.id + "&type_upload=" + TYPE_UPLOAD_VIDEO + "&from=video";
                        });
                    } else {
                        showDialog("Warning", "Upload File Sucess <br/><b>" + rd + "</b>");
                    }
                });

            });
        },

    }


});