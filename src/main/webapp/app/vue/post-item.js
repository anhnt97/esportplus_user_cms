Vue.component('paginate', VuejsPaginate);
Vue.component('post-item', {
    template: `
    <div class="media distance">

        <input v-model="checked" style="position: absolute; top: 50%; transform: translate(0,-50%); left: 0;" type="checkbox" @change="onCheckboxClick" ref="checkbox"/>

        <div>
            <div class="media-left">
              
              <div style="width: 200px" >
                   <img class="img-thumbnail" style="width: 100%" :src="getUrlThumb(post)"/>
               </div>
              
            </div>
        
            <div class="media-body">
              <h4 class="media-heading in"><a target="_blank"  :href="buildLink(post)"><font v-bind:style="getTextStyle">{{post.name}}</font> </a></h4>
        
              <div class="dropdown pull-right">
                <a data-toggle="dropdown" href="">Action<span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                  <li role="presentation"><a role="menuitem" tabindex="-1" v-on:click.prevent="viewPostClick(post)" href="#">View</a>
                  </li>
                  <li role="presentation"><a role="menuitem" tabindex="-1" v-on:click.prevent="deletePostClick(post)"
                                             href="#">Delete</a>
                  </li>
                </ul>
              </div>
              <p>Created by: <strong> {{post.creator.acc_name}}</strong> <i>{{getTextInfo()}}</i></p>
              <p>Created at: <strong>{{convertTime(post.created_at)}}</strong></p>
        
              <p>Share: {{formatNumber(post.share)}}, Like: {{formatNumber(post.like)}}, Dislike: {{formatNumber(post.dislike)}}, Comment: {{formatNumber(post.comment)}},
                View:
                {{formatNumber(post.total_views)}}</p>
            </div>
        </div>
        
      </div>
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

        getTextInfo() {
            let ct = " (";
            if (this.post.typepost === TYPE_POST_NEWS) {
                ct += "News";
            }
            else {
                ct += "Video";
            }
            if (this.post.source === SOURCE_FACEBOOK) {
                ct += " - Facebook)";
            } else if (this.post.source === SOURCE_YOUTUBE) {
                ct += " - Youtube)";
            } else {
                ct += " - Upload)";
            }
            return ct;
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
                const obj = thumb[0];
                if (obj !== null && obj !== undefined) {
                    val = obj.url;
                }
            }
            return val;
        },
        buildLink(post) {
            // return "http://content.topshare.live/" + post._id;
            let href = "";
            if (post.typepost === TYPE_POST_NEWS) {
                href = "news-edit?id=" + post._id + "&type_post=" + post.typepost;
            } else {
                href = "youtube-edit?id=" + post._id + "&type_post=" + post.typepost;
            }

            return href;
        },

        convertTime(unix_time) {
            const date = new Date(unix_time);
            return date.toLocaleString();
        },
        viewPostClick(post) {
            let href = "";
            // if (post.typepost === TYPE_POST_VIDEO) {
            //     href = "youtube-edit?id=" + post._id + "&type_post=" + post.typepost;
            // } else
            if (post.typepost === TYPE_POST_NEWS) {
                href = "news-edit?id=" + post._id + "&type_post=" + post.typepost;
            } else {
                href = "youtube-edit?id=" + post._id + "&type_post=" + post.typepost;
            }

            window.open(href, '_blank');
            return false;
        },
        deletePostClick(post) {
            this.$emit('deleted');
            return false;
        },

        approvePostClick(post) {
            this.$emit('approve');
            return false;
        }

    }
});