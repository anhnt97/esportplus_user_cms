const app = new Vue({
    el: '#posts-manager-root',
    beforeDestroy(){
        this.stompController.closeConnection();
    },
    mounted() {
        const url = window.location.href.slice(window.location.href.indexOf('?') + 1);
        if (url !== undefined && url !== null && url.trim().length > 0) {
            const obj = convertQueryStringToJson(url);
            if (obj !== null && obj !== undefined) {
                this.posts_manager_id = obj.id;
            }
        }
        this.data_fetch["parent_match_id"] = this.posts_manager_id;
        this.update_request.id = this.posts_manager_id;

        this.loadContent();
        this.getListBetTable(this.data_fetch);
        this.getListBetMode();
        this.stompController = new StompController(this.posts_manager_id);
        this.stompController.connection();
        // this.interval_reload = setInterval(this.interval_reloadTable.bind(this), 15000);

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
                offset: 0,
                parent_match_id:""
            },
            paging: {
                selected_page: 0
            },
            posts_manager_id: "",
            bet_modes:[],
            list_tables:[],
            title_post:"",
            current_bet_status:0,
            update_request: {
                id: "",
                type: 1,
                set: 1,
                match: 1,
                categories: [],
                title: "",
                description: "",
                thumb: "",
                tournaments: "",
                creator: "",
                members1:[],
                members2:[],
                game_mode:"",
                link_streams: [],
                tags: [],
                score1:0,
                score2:0,
                status:NORMAL,
                start_time: "",
                bet_status:0,
                betMatchConditions:[],
            },
            stompController:null,
            interval_reload:null,
            showModal:false,
            modal_data:null,
        }
    },
    watch: {
        // name_team_select: function (val) {
        //     if (val === "" || val.isEmpty()) {
        //         this.getListBetTable(this.data_fetch);
        //     }
        // }
    },
    methods: {
        /**
         *  Get list team
         * @param params
         */
        loadContent() {
            const params = {
                id: this.posts_manager_id
            };
            const req = new Request();
            req.request("get-bet-match-info", params, (data) => {
                hideAllModal();
            console.log(JSON.stringify(data));
            this.fillData(data);
            //this.getListMember();
        });
        },
        fillData(data) {
            const rc = parseInt(data.rc);
            if (rc === 0) {
                const item = data.item.betMatch;


                this.update_request.betMatchConditions= data.item["betMatchConditions"];
                if (item !== null && item !== undefined) {
                    this.title_post = item.title;
                    this.update_request.set = item.set;
                    this.update_request.match = item.match;

                    this.update_request.title = item.title;
                    this.update_request.game_mode = item.game_mode;
                    this.update_request.tournaments = item.tournaments;
                    this.update_request.description = item.description;
                    this.update_request.thumb = item.thumb;
                    this.update_request.start_time = item.start_time;
                    this.update_request.type = item.type;
                    this.update_request.tags = item.tags;
                    this.update_request.bet_status = item.bet_status;

                    this.current_bet_status = item.bet_status;

                    const cats_data = [];
                    const cats_origin = item.categories;
                    if (isArray(cats_origin)) {
                        for (let i = 0; i < cats_origin.length; ++i) {
                            const o = cats_origin[i];
                            cats_data.push(o._id);
                        }
                    }
                    this.update_request.categories = cats_data;

                    // set member
                    let list_team1 = item["list_team_bet"][0];
                    let list_team2 = item["list_team_bet"][1];
                    this.update_request.score1 = list_team1.score_team;
                    this.update_request.score2 = list_team2.score_team;


                    // current status
                    this.update_request.status = item.status;
                    this.update_request.bet_status = item.bet_status;
                }
            }
        },
        getListBetTable(params) {
            const req = new Request();
            req.getNoModal("bet-table-get", params, (data) => {
                this.items = data.rows;
            this.total = data.total;
            console.log("Total :" + data.total);
            this.totalPages = Math.floor(data.total / this.limitRecord);
            const a1 = data.total % this.limitRecord;
                if (a1 !== 0) {
                    this.totalPages++;
                }
            });
        },

        getListBetMode(){
            const req = new Request();
            let param = {
                parent_match_id:this.posts_manager_id
            };
            req.getNoModal("get-bet-match-con", param, (data) => {
                this.bet_modes= data.rows;

            });
        },
        /**
         *  Delete post
         * @param id
         */
        deleteItem(id) {
        },
        /**
         *  Remove team
         * @param id
         */
        removeItem(id) {
        },

        approveItem(item) {

        },
        /**
         *
         * @param pageNum
         */
        onPagingClick(pageNum) {
            this.data_fetch.offset = pageNum;
            this.getListBetTable(this.data_fetch);
        },
        convertTime(unix_time) {
            const date = new Date(unix_time);
            return date.toLocaleString();
        },
        convertStatus(status) {
            if (status == BET_STATUS_OFF) {
                return "Close";
            } else if (status == BET_STATUS_ON) {
                return "Open";
            } else {
                return "Unknown";
            }
        },
        onButtonUpdate(id, status)
        {
            console.log("Lock table " + id);
            //{"bet_table_ids":["5b6e6581195cfb53827c8f44"]}
            let params = {
                bet_table_ids:[id]
            };


            if(status == BET_STATUS_OFF)
            {
                const req = new Request();
                req.post("unlock-bet-table", params,(data)=>{
                    console.log(JSON.stringify(data));
                    if (parseInt(data.rc) === 0)
                    {

                    showDialog("Notice", "UnLock Bet Table success <br/>", null,()=> {
                        //MinhDV
                        this.data_fetch.offset = 1;
                    this.getListBetTable(this.data_fetch);
                    });
                    }
                });
            }else{
                const req = new Request();
                req.post("lock-bet-table", params,(data)=>{
                    console.log(JSON.stringify(data));
                    if (parseInt(data.rc) === 0)
                {

                    showDialog("Notice", "Lock Bet Table success <br/>", null,()=> {
                        //MinhDV
                        this.data_fetch.offset = 1;
                    this.getListBetTable(this.data_fetch);
                });
                }
            });
            }
        },
        onButtonUpdateAllTable(){
            emptyArray(this.list_tables);
            this.items.forEach((e,i)=>{
                if(e.bet_status == BET_STATUS_ON)
                this.list_tables.push(e._id);
            });
            let params = {
                bet_table_ids:this.list_tables
            };
            console.log(JSON.stringify(params));
            const req = new Request();
            req.post("lock-bet-table", params,(data)=>{
                console.log(JSON.stringify(data));
            if (parseInt(data.rc) === 0)
            {

                showDialog("Notice", "Lock Bet Table success <br/>", null,()=> {
                    //MinhDV
                    this.data_fetch.offset = 1;
                this.getListBetTable(this.data_fetch);
            });
            }
        });

        },
        onUpdateResult()
        {
            //reload bet status
            this.loadContent();
        },
        onButtonUpdateSetMatch(){
            //{"set":1,"match":1,"bet_match_id":"5b706aad195cfb7724d7c815","bet_status":0}
            let params = {
                set:this.update_request.set,
                match:this.update_request.match,
                bet_match_id:this.posts_manager_id,
                bet_status:this.current_bet_status
            };
            confirmDialog("Do you want update set match", "Edit", () => {
                    const req = new Request();
                    console.log("Data update" + JSON.stringify(params));
                    req.post("update-set-betmatch", params, (data) => {
                        if (parseInt(data.rc) === 0) {
                        showDialog("Notice", "Update set match success <br/>", null, () => {
                            // this.getListBetTable(this.data_fetch);
                            // this.getListBetMode();
                            // this.loadContent();
                            location.reload();
                    });


                    } else {
                        showDialog("Warning", "Update set match failure <br/>" + data.rd);
                    }
                });

            });

        },
        genValue(status)
        {
            if(status == BET_STATUS_OFF)
            {
                return "Unlock Table";
            }else{
                return "Lock Table";
            }
        },
        formatMoney(money)
        {
            return money.formatMoney(0, '.', ',');
        },
        onTurnOffBetMatch()
        {
            let params  ={
                bet_match_id:this.posts_manager_id
            };

            confirmDialog("Do you want update bet status", "Edit", () => {
                if (this.current_bet_status == BET_STATUS_ON) {
            const req = new Request();
            req.post("lock-bet-match", params, (data) => {
                if (parseInt(data.rc) === 0) {
                showDialog("Notice", "Update bet status success <br/>", null, () => {
                    this.loadContent();
            });
            } else {
                showDialog("Warning", "Update bet status failure <br/>" + data.rd);
            }
        });
        } else if (this.current_bet_status == BET_STATUS_OFF) {
            const req = new Request();
            req.post("unlock-bet-match", params, (data) => {
                if (parseInt(data.rc) === 0) {
                showDialog("Notice", "Update bet status success <br/>", null, () => {
                    this.loadContent();
            });
            } else {
                showDialog("Warning", "Update bet status failure <br/>" + data.rd);
            }
        });
        }

        });


        },
        generateButtonBetStatus(){
            if(this.current_bet_status == NORMAL)
            {
                return "Turn OFF";
            }else{
                return "Turn On";
            }
        },
        generateBetStatus(){
            if(this.current_bet_status == NORMAL)
            {
                return "ON";
            }else{
                return "OFF";
            }
        },
        callBackFunction(type_bet){
            console.log("callBackFunction = " + type_bet);
            if(type_bet == TYPE_NEW_BET)
            {
                this.getListBetTable(this.data_fetch);
            }
        },
        interval_reloadTable(){
            console.log("interval_reloadTable");
            this.getListBetTable(this.data_fetch);
        },
        removeInterval(){
            clearInterval(this.interval_reload);
        },
        showModalFunc(post){
            this.showModal = true
            this.modal_data = post;
        }
    }
});