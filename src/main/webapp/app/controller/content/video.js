/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const app = new Vue({

    el: '#app',

    data: {
        currentView: 'blank-upload-component',
        options: [],
        link: '',
        blockContent: 'display: none;',
        blockComment: 'display: none;',
        file: null,
        file_type: -1
    },

    mounted() {
        this.getCategories();
        this.showFormComment();
    },

    methods: {

        onContentCreated(e) {
            this.currentView = 'blank-upload-component';
        },

        getCategories() {

            const req = new Request();
            const params = {
                start: 0,
                limit: 1000000,
                type_page: TYPE_PAGE_VIDEO
            };

            req.requestNoModal("get-category", params, (data) => {
                let rows = data.rows;
                if (rows !== undefined && rows !== null && rows.length > 0) {
                    this.options = [];
                    for (let i = 0; i < rows.length; i++) {
                        let obj = rows[i];
                        let title = obj.title;
                        let id = obj._id;
                        this.options.push({id: id, name: title});
                    }
                }
            });

        },

        showFormContent() {
            this.blockContent = 'display: block;';
        },

        hideFormContent() {
            this.blockContent = 'display: none;';
        },

        showFormComment() {
            this.blockComment = 'display: block;';
        },

        hideFormComment() {
            this.blockComment = 'display: none;';
        },

        onVideoFileChange(e) {

            console.log("change file, catch here !!!");
            const files = e.target.files || e.dataTransfer.files;

            if (!files) {
                errors += "File upload not supported by your browser.";
                showDialog("Warning", "File upload not supported by your browser.");
                return;
            }

            if (files && files[0]) {

                const file = files[0];
                const size = parseInt(file.size / 1048576);
                console.log("size = " + file.size / 1048576 + " MB");

                if (size > 200) {
                    showDialog("Warning", "File size can not over 200 MB<br/> Your file <b>" + size + "</b> MB");
                    return;
                }

                const checkFile = this.checkFileType(file);
                if (checkFile < 0) {
                    showDialog("Notice", "Please choose MP4, FLV or WMV file format<br/>");
                    return;
                }

                const input = this.$refs.choose_video_file;
                input.type = 'text';
                input.type = 'file';
                this.file = file;
                this.file_type = checkFile;

                if (checkFile === 0) {
                    this.currentView = 'upload-component';
                } else if (checkFile === 1) {
                    this.currentView = 'upload-non-mp4-component';
                }

                this.showFormContent();

            }

        },

        checkFileType(file) {
            if ((/\.(mp4)$/i).test(file.name)) {
                return 0;
            } else if ((/\.(flv)$/i).test(file.name) || (/\.(wmv)$/i).test(file.name)) {
                return 1;
            }
            return -1;
        },

        detectTypeLink(link) {
            const regex_fb = /^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i;
            const regex_yt = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            if (link.match(regex_fb)) {
                return SOURCE_FACEBOOK;
            } else if (link.match(regex_yt)) {
                return SOURCE_YOUTUBE;
            }
            return -1;
        },

        getLinkExecute() {

            const link = $("#link_youtube").val();

            if (!checkInputString(link)) {
                showDialog("Notice", "Please enter a video url");
                return false;
            }

            if (!isURL(link)) {
                showDialog("Notice", "URL format incorrect");
                return false;
            }

            let sourceURL = this.detectTypeLink(link);
            if (sourceURL === -1) {
                showDialog("Notice", "Please provice an url facebook or youtube");
                return false;
            }

            const req = new Request();
            req.requestNoModal("check-url", {url: link}, (data) => {
                if (data.result == true) {
                    showDialog("Warning", "Video url existed");
                } else {
                    this.showFormContent();
                    this.link = link;
                    if (sourceURL === SOURCE_FACEBOOK) {
                        this.currentView = 'facebook-component';
                    } else if (sourceURL === SOURCE_YOUTUBE) {
                        this.currentView = 'youtube-component';
                    } else {
                        this.currentView = 'blank-upload-component';
                    }
                }
            });
        },

        getInfoClick(e) {
            this.getLinkExecute();
            return false;
        },

    }

});
