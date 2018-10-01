Vue.component('paginate', VuejsPaginate);
Vue.component('bet-manager-item', {
    template: `
    <!--<div class="media distance">-->

        <!--<div>-->
            <!--<div class="media-body">-->
              <!--<h4 class="media-heading in"><a target="_blank" ><font v-bind:style="getTextStyle">{{post.name}}</font> </a></h4>-->
              <!--<div class="dropdown pull-right">-->
                <!--<a data-toggle="dropdown" href="">Action<span class="caret"></span></a>-->
                <!--<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">-->
                <!---->
                  <!--<li role="presentation"><a role="menuitem" tabindex="-1" v-on:click.prevent="viewPostClick(post)" href="#">View</a>-->
                  <!--</li>-->
                  <!---->
                  <!--</li>-->
                  <!---->
                <!--</ul>-->
              <!--</div>-->
              <!--<p>Banker Name: <strong> {{post.banker_name}}</strong></p>-->
              <!--<p>Banker choose : <strong>{{post.banker_con.name}}</strong></p>-->
              <!--<p>Max Amount : <strong>{{post.max_amount}}</strong></p>-->
              <!--<p>Min Amount : <strong>{{post.min_amount}}</strong></p>-->
              <!--<p>Current Bet : <strong>{{post.current_amount}}</strong></p>-->
              <!--<p>Table Status : <strong>{{convertStatus(post.table_status)}}</strong></p>-->
              <!--<p>Bet Type: <strong>{{post.bet_match_condition.bet_mode.bet_name}}</strong></p>-->
              <!--<p>Created at: <strong>{{convertTime(post.created_at)}}</strong></p>-->
            <!--</div>-->
        <!--</div>-->
        <!---->
      <!--</div>-->
    `,
    props: ['post', 'check_state'],

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
            checked: false
        }
    },

    methods: {
        onCheckboxClick(e) {
            console.log(this.post);
            console.log("e: " + e.target.checked + " : " + this.post._id);
            this.$emit("checkbox-change", [e.target.checked, this.post._id]);
        },

        formatNumber(c) {
            if (isNaN(c)) {
                return "0";
            }
            const nf = new Intl.NumberFormat();
            return nf.format(c);
        },
        getUrlThumb(post) {
            const thumb = post.thumb;
            let val = "";
            if (thumb !== null && thumb !== undefined) {
                val = thumb;
            }
            return val;
        },
        buildLink(post) {
            let href = "bet-match-manager-edit?id=" + post._id;
            return href;
        },


        viewPostClick(post) {
            let href = "bet-match-manager-edit?id=" + post._id;
            window.open(href, '_blank');
            return false;
        },
        deletePostClick(post) {
            this.$emit('deleted');
            return false;
        },
        managementBetClick(post) {

        },
        approvePostClick(post) {
            this.$emit('approve');
            return false;
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
        }

    }
});