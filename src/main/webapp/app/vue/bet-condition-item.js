Vue.component('paginate', VuejsPaginate);
Vue.component('bet-condition-item', {
    template: `
        <div class="table-cell">
              
              <select v-model="bet_val" v-if="displayselect">
                <option v-for="item in post.conditions" 
                :value="item.value">{{item.name}}</option>
                </select>
                
                <!--<input type="text" id="name-team" class="form-control" v-model="this.score"-->
                <!--v-if="displayinput" placeholder="Total Match Score">-->
                
                  <input type="button" v-on:click.prevent="onButtonUpdate" class="btn btn-primary"
                               value="Update Result"/>
        </div>
    `,
    props: ['post', 'check_state','bet_status'],

    watch: {
        check_state: function (newVal, oldVal) {
            this.checked = newVal;
        }
    },
    computed: {
        getTextStyle() {
            return this.post.status === 2 ? {color: "red"} : {color: "blue"};
        },
    },
    mounted() {
        this.checked = this.check_state;
    },
    data() {
        return {
            message: "",
            textStyle: {
                color: "blue"
            },
            checked: false,
            bet_val: 1,
            score: 0,
            result_params: {
                set: 1,
                match: 1,
                parent_match_id: "",
                bet_match_con_id: "",
                result: {}
            }
        }
    },

    methods: {

        convertTime(unix_time) {
            const date = new Date(unix_time);
            return date.toLocaleString();
        },
        onButtonUpdate() {
            // if(this.bet_status == BET_STATUS_ON)
            // {
            //     showDialog("Warning", "Cannot update result when bet is ON. Please turn off bet !");
            //     return;
            // }

            this.post.conditions.forEach((e, i)=> {
                if(e.value == this.bet_val)
            {
                this.result_params.result = e;
            }
        });


            this.result_params.set = this.post.set;
            this.result_params.match = this.post.match;
            this.result_params.parent_match_id = this.post.parent_match_id;
            this.result_params.bet_match_con_id = this.post._id;

            //:{"set":0,"match":0,"parent_match_id":"5b6e5e9c195cfb449465d83b",
            // "result":{"name":"SKT T1","value":1},"bet_match_con_id":"5b6e5e9c195cfb449465d83c"}

            console.log(JSON.stringify(this.result_params));

            confirmDialog("Do you want update bet result", "Edit", () => {
                this.updateResult();
        });
        },
        updateResult(){
            const req = new Request();
            req.post("updateresult", this.result_params,(data)=>{
                console.log(JSON.stringify(data));
            if (parseInt(data.rc) === 0)
            {

                showDialog("Notice", "Update Result Success <br/>", null,()=> {
                    this.$emit("update_result");
            });
            }else{
                showDialog("Warning", "Update bet status failure <br/>" + data.rd);
            }
        });
        },
        displayselect() {
            return this.post.bet_mode.bet_type != 1;
        },
        displayinput() {
            return this.post.bet_mode.bet_type == 1;
        }

    }
});