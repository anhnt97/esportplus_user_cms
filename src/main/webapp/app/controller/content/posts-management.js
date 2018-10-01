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
            req.get("get-list-posts-manager", params, (data) => {
                this.items = data.rows;
                this.total = data.total;
                console.log("Total :" + data.total);
                this.totalPages = Math.floor(data.total / this.limitRecord);
                const a1 = data.total % this.limitRecord;
                if (a1 !== 0) {
                    this.totalPages++;
                }
                console.log("this.totalPages = " + this.totalPages);
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
                req.delete("posts-manager-delete", params, (result) => {
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
        /**
         *
         * @param pageNum
         */
        onPagingClick(pageNum) {
            this.data_fetch.offset = pageNum -1;
            this.getListPostsManager(this.data_fetch);
        },
        /**
         *
         */
        onAddNewPostsManagerClick() {
            let href = "upload-posts-manager";
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
                req.request("find-posts-manager",params, (data) => {
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
        onSearchClick() {
            this.searchTeamByName(this.posts_manager_select);
        }
    }

});