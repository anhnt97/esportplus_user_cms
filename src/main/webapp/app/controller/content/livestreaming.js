/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const app = new Vue({

    el: '#live_component',

    data() {
        return {
            select_idx:1,
            currentView: 'blank-upload-component',
            options: [],
            link: '',
            blockContent: 'display: none;',
            blockComment: 'display: none;',
            file: null,
            file_type: -1
        }
    },

    mounted() {
        console.log("on Mounted live streaming");
        this.getCategories();
        this.showFormComment();
    },

    methods: {

        onContentCreated(e) {

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
        onSelectContent(e){
            let select_el = this.$refs.select_el;
            let index = parseInt(select_el.selectedIndex);
            console.log(select_el.selectedIndex);
            if(parseInt(this.select_idx) === 1){
                // this.currentView = "youtube-livenow-component";
                this.$refs.info_component.style.visibility='visible';
                this.currentView = 'blank-upload-component';
            }else if(parseInt(this.select_idx) === 2){
                this.$refs.info_component.style.visibility='hidden';
                this.currentView = "livefinish-component";
            }else{
                // this.currentView = 'blank-upload-component';

            }
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
                    this.currentView = 'livenow-component';
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
    }

});
