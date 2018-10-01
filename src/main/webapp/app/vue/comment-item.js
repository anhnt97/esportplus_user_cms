Vue.component('comment-item', {

    template: `
        <div>
            <span class="chat-img pull-left" style="margin-right: 10px">
                <img v-bind:src="comment.author.acc_img" class="img-circle img-thumbnail" alt="avatar" style="width: 40px; height: 40px"/>
            </span>
            <div class="chat-body clearfix" style="overflow: hidden">
                <div class="header">
                    <strong class="primary-font"> {{ comment.author.acc_name }}</strong>
                    <div class="pull-right">
                        <a href="#" v-on:click.prevent="deleteComment(comment._id)">Delete</a>
                    </div>
                </div>
                <p> {{ comment.comment }} </p>
                
                <small class="text-muted"><i class="fa fa-clock-o"></i> {{convertTime(comment.date)}}</small>
                
            </div>
            
        </div>
    `,

    props: ['comment'],

    data() {
        return {}
    },

    computed: {},

    methods: {

        convertTime(unix_time) {
            const date = new Date(unix_time);
            return date.toLocaleString();
        },

        deleteComment() {
            this.$emit("deleted");
        },
    }

});
