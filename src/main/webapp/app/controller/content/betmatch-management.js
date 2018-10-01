const app = new Vue({
    el: '#posts-manager-root',
    mounted() {
        this.getListPostsManager(this.data_fetch);
    },
    data() {
        return {
            items: [],
            total: 0,
            totalPages: 0,
            limitRecord: 6,
            posts_manager_select: "",
            name_team_select: "",
            data_fetch: {
                offset:0
            },
            paging: {
                selected_page: 0
            }
        }
    },
    watch:{
        name_team_select:function (val) {
            if (val === "" || val.isEmpty()){
                this.getListPostsManager(this.data_fetch);
            }
        }
    },
    methods: {
        /**
         *  Get list team
         * @param params
         */
        getListPostsManager(params) {
            const req = new Request();
            req.get("bet-match-get", params, (data) => {
                this.items = data.rows;
                this.total = data.total;
                console.log("Total :" + data.total);
                this.totalPages = Math.floor(data.total / this.limitRecord);
                const a1 = data.total % this.limitRecord;
                if (a1 !== 0) {
                    this.totalPages++;
                }
                console.log("this.totalPages = " + this.totalPages);
                console.log("data bet match : " + JSON.stringify(this.items));
            });
        },
        /**
         *  Delete post
         * @param id
         */
        deleteItem(id) {
            console.log("delete item: " + id);
            confirmDialog("Do you want delete this post ?", "Delete", () => {
                const req = new Request();
                const params = {id: id};
                req.delete("bet-match-delete", params, (result) => {
                    const rc = parseInt(result.rc);
                    if (rc === 0) {
                        showDialog("Notice", "Delete success", null, () => {
                            this.removeItem(id);
                        });
                    } else {
                        const rd = result.rd;
                        showDialog("Warning", "Delele failed !!! <br/><p>" + rd + "</p>");
                    }
                });
            });
        },
        /**
         *  Remove team
         * @param id
         */
        removeItem(id) {
            let index = -1;
            for (let i = 0; i < this.items.length; ++i) {
                if (this.items[i]._id === id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                this.items.splice(index, 1);
            }
        },

        approveItem(item) {

        },

        offlineItem(item){
            console.log(item._id);
            let id_post = item._id;
            if(item["status"] == OFFLINE)
            {
                const params = {
                    id: id_post,
                    status: NORMAL
                };
                confirmDialog("Do you want show this post on app?", "Show", () => {
                    const req = new Request();

                req.post("bet-match-turnoff", params, (result) => {
                        const rc = parseInt(result.rc);
                    if (rc === 0) {
                        showDialog("Notice", "Show success", null, () => {
                            location.reload();
                    });
                    } else {
                        const rd = result.rd;
                        showDialog("Warning", "Show failed !!! <br/><p>" + rd + "</p>");
                    }
                    });
                });
            }else{
                let params = {
                    id: id_post,
                    status: OFFLINE
                };
                confirmDialog("Do you want hide this post on app ?", "Hide", () => {
                    const req = new Request();

                req.post("bet-match-turnoff", params, (result) => {
                    const rc = parseInt(result.rc);
                if (rc === 0) {
                    showDialog("Notice", "Hide success", null, () => {
                        location.reload();
                });
                } else {
                    const rd = result.rd;
                    showDialog("Warning", "Hide failed !!! <br/><p>" + rd + "</p>");
                }
            });
            });
            }

        },
        /**
         *
         * @param pageNum
         */
        onPagingClick(pageNum) {
            this.data_fetch.offset = pageNum;
            this.getListPostsManager(this.data_fetch);
        },
        /**
         *
         */
        onAddNewPostsManagerClick() {
            let href = "upload-bet-match";
            window.open(href, '_blank');
            return false;
        },
        onPostsManagerNameKeyUp(keySearch){
            this.searchTeamByName(keySearch);
        },
        searchTeamByName(keySearch){
            console.log('Key Video Search Value:', keySearch);
            if (checkInputString(keySearch)){
                keySearch = keySearch.trim();
                let params = {
                    keyword: encodeURIComponent(keySearch),
                };
                const req = new Request();
                req.request("find-bet-match",params, (data) => {
                    if (isArray(data.rows)){
                        this.items = data.rows;
                        this.total = data.total;
                        console.log("Total :" + data.total);
                        this.totalPages = Math.floor(data.total / this.limitRecord);
                        const a1 = data.total % this.limitRecord;
                        if (a1 !== 0) {
                            this.totalPages++;
                        }
                        console.log("this.totalPages = " + this.totalPages);
                    }
                });
            }
        },
        reloadList(){
            this.data_fetch.offset = 1;
            this.getListPostsManager(this.data_fetch);
        },
        onSearchClick() {
            this.searchTeamByName(this.posts_manager_select);
        }
    }

});