Vue.component('video-component', {

    template: `
        <div>
            <video width="100%" 
                v-bind:src="video_data" 
                v-on:seeked="onVideoSeeked"
                v-on:loadeddata="onVideoLoadeddata"
                v-on:error="onVideoError" 
                
                controls id="video" ref="video">
            </video>
            <div style="display: inline-block;margin-top: 5px">
                <label>You must seek to get thumb</label>
                <a href="#" v-on:click.prevent="onOnOffClick()"> (click to {{onoff_state}})</a>
            </div>
            
            <div id="trim_component" style="display: block;" ref = "trim_div">
            
              <input type="radio" name="seekType" value="0" v-on:click="onChangeSeekType" checked="true"> Seek For Start Trim
              <input type="radio" name="seekType" value="1" v-on:click="onChangeSeekType"> Seek For End Trim
            
            <trim_component 
                v-bind:duration_data.sync="duration_data" 
                v-bind:st = "seek_start"
                v-bind:se= "seek_end"
                ref="trim_component" 
              @trim_video="onVideoTrim($event)"></trim_component>
            </div>
    
        </div>
    `,

    props: ['video_data', 'post_id', 'origin_url','duration_data'],
    data() {
        return {
            turn_off_seek_thumb: true,
            onoff_state: "ON",
            //MinhDV
            seekType:0,//0 - seek for start trim, 1- seek for end trim,
            seek_start:"0",
            seek_end:"0",
        }
    },

    mounted() {
        this.seekType = 0;
        this.seek_start = "0";
    },

    methods: {

        onOnOffClick() {
            this.turn_off_seek_thumb = !this.turn_off_seek_thumb;
            if (this.turn_off_seek_thumb) {
                this.onoff_state = "ON";
            } else {
                this.onoff_state = "OFF";
            }
        },

        onVideoSeeked(e) {
            var currentTime = e.target.currentTime;

            if(this.seekType == 0)
            {
                this.seek_start = currentTime;
            }else{
                this.seek_end = currentTime;
                this.$emit("update:duration_data", this.seek_end);
            }

            if (!this.turn_off_seek_thumb) {
                this.generateThumbnail(e.target);
            }
        },

        onVideoLoadeddata(e) {
            // console.log("onVideoLoadeddata on component " + JSON.stringify(e));
            this.seek_end = this.$refs.video.duration;
            this.$emit('data-loaded', e);
        },

        onVideoError() {
            console.log("Video load Error !!!");
            if (checkInputString(this.post_id)) {
                console.log("renew link: " + this.post_id);
                const req = new Request();
                req.postHide("renew-link", {"post_id": this.post_id}, (data) => {
                    console.log("renew link: " + JSON.stringify(data));
                });
            }
            if (checkInputString(this.origin_url)) {
                const req = new Request();
                req.requestNoModal("video/streaming", {u: this.origin_url}, (data) => {
                    console.log("video/streaming");
                    const d = data.data;
                    if (isArray(d) && d.length > 0) {
                        const u = d[0].url;
                        if (checkInputString(u)) {
                            this.$refs.video.src = u;
                        }
                    }
                });
            }
        },

        generateThumbnail(video) {
            const c = document.getElementById("myCanvas1");
            const ctx = c.getContext("2d");
            const h = video.videoHeight;
            const w = video.videoWidth;
            c.width = w;
            c.height = h;
            ctx.drawImage(video, 0, 0, w, h);
            try {
                const pngUrl = c.toDataURL();
                this.$emit('create-thumb', pngUrl);
            } catch (e) {
                console.error(e);
                showDialog("Sorry", "We can not generate thumbnail from this video, please upload or use default thumbnail");
            }
        },
        //
        onVideoTrim(e)
        {
             this.$emit("trim_video", e);
        },
        onChangeSeekType(e)
        {
            var value = e.target.value;
            console.log(value);
            this.seekType = parseInt(value);
        }
    },
    
});