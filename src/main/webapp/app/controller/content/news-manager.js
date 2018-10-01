const app = new Vue({
    el: '#root',
    mounted() {
        this.getListPost(this.data_fetch);
    },

    data() {
        return {
            items: [],
            total: 0,
            totalPages: 0,
            limitRecord: 50,
            data_fetch: {
                start: 0,
                limit: 50,
                key: "",
                oldKey: "",
                typepost:TYPE_POST_NEWS
            },
            paging: {
                selected_page: 0
            }
        }
    },

    methods: {

        getListPost(params) {
            const req = new Request();
            req.get("content-get", params, (data) => {
                this.items = data.rows;
            this.total = data.total;
            this.totalPages = Math.floor(data.total / this.limitRecord);
            const a1 = data.total % this.limitRecord;
            if (a1 !== 0) {
                this.totalPages++;
            }
            console.log("this.totalPages = " + this.totalPages);
        });
        },
        deleteItem(id) {
            console.log("delete item: " + id);
            confirmDialog("Do you want delete this post ?", "Delete", () => {
                const req = new Request();
            const params = {id: id};
            req.delete("post-delete", params, (result) => {
                const rc = parseInt(result.rc);
            if (rc === 0) {
                showDialog("Notice", "Delete success", null, () => {
                    this.removeItem(id);
            });
            } else {
                const rd = result.rd;
                showDialog("Warning", "Delele failed !!! <br/><b>" + rd + "</b>");
            }
        });
        });
        },

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

        onPagingClick(pageNum) {
            this.data_fetch.start = (pageNum - 1) * this.limitRecord;
            this.getListPost(this.data_fetch);
        },

        onSearchClick() {
            if (this.data_fetch.key !== this.data_fetch.oldKey) {
                this.data_fetch.oldKey = this.data_fetch.key;
                this.data_fetch.start = 0;
                this.paging.selected_page = 0;
                this.getListPost(this.data_fetch);
            }
        }
    }
});