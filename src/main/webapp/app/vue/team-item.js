Vue.component('paginate', VuejsPaginate);
Vue.component('team-item', {
    template: `
    <div class="media distance">

        <input v-model="checked" style="position: absolute; top: 50%; transform: translate(0,-50%); left: 0;" type="checkbox" @change="onCheckboxClick" ref="checkbox"/>

        <div>
            <div class="media-left">
              
              <div style="width: 200px; height: 100px" >
                   <img class="img-thumbnail" style="width: 50%" :src="getUrlThumb(team)"/>
               </div>
            </div>
        
            <div class="media-body">
              <h4 class="media-heading in"><a target="_blank" v-on:click.prevent="viewPostClick(team)" href="#"><font v-bind:style="getTextStyle">{{team.name}}</font> </a></h4>
        
              <div class="dropdown pull-right">
                <a data-toggle="dropdown" href="">Action<span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                  <li role="presentation"><a role="menuitem" tabindex="-1" v-on:click.prevent="viewPostClick(team)" href="#">View</a>
                  </li>
                  <li role="presentation"><a role="menuitem" tabindex="-1" v-on:click.prevent="deletePostClick(team)"
                                             href="#">Delete</a>
                  </li>
                </ul>
              </div>
              <p>Category: <strong> {{team.categories[0].title}}</strong></p>
 
            </div>
        </div>
        
      </div>
    `,
    props: ['team', 'check_state'],

    watch: {
        check_state: function (newVal, oldVal) {
            this.checked = newVal;
        }
    },
    computed: {
        getTextStyle() {
            return this.team.status === 2 ? {color: "red"} : {color: "blue"};
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
            console.log(this.team);
            console.log("e: " + e.target.checked + " : " + this.team._id);
            this.$emit("checkbox-change", [e.target.checked, this.team._id]);
        },


        formatNumber(c) {
            if (isNaN(c)) {
                return "0";
            }
            const nf = new Intl.NumberFormat();
            return nf.format(c);
        },
        getUrlThumb(team) {
            const thumb = team.icon;
            let val = "";
            if (thumb !== null && thumb !== undefined) {
                    val = thumb;
            }
            return val;
        },

        convertTime(unix_time) {
            const date = new Date(unix_time);
            return date.toLocaleString();
        },
        viewPostClick(team) {
            let href = "team-member-edit?id=" + team._id;
            window.open(href, '_blank');
            return false;
        },
        deletePostClick(team) {
            this.$emit('deleted');
            return false;
        },

        approvePostClick(team) {
            this.$emit('approve');
            return false;
        }

    }
});