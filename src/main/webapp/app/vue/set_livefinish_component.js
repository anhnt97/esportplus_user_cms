Vue.component('set_live_component',{
    template: `
         <div style="padding-left: -10px">
                    <label for="">Match 1:</label>
                    <input type="text" v-model.lazy="matches.match1" v-on:keyup="onVideoNameKeyUp($event.target.value)" class="form-control match"  placeholder="search video ...">
                    <label for="">Match 2:</label>
                    <input type="text"   v-model.lazy="matches.match2" v-on:keyup="onVideoNameKeyUp($event.target.value)" class="form-control match" placeholder="search video ...">
                    <label for="">Match 3:</label>
                    <input type="text" v-model.lazy="matches.match3"  v-on:keyup="onVideoNameKeyUp($event.target.value)" class="form-control match"  placeholder="search video ...">
                    <label for="">Match 4:</label>
                    <input type="text" v-model.lazy="matches.match4" v-on:keyup="onVideoNameKeyUp($event.target.value)" class="form-control match"  placeholder="search video ...">
                    <label for="">Match 5:</label>
                    <input type="text" v-model.lazy="matches.match5"  v-on:keyup="onVideoNameKeyUp($event.target.value)" class="form-control match"  placeholder="search video ...">
         </div>
    `,
    props:['matches'],
    computed: {
    },
    data() {
        return {
            listVideo: []
        }
    },
    mounted(){
        //console.log(JSON.stringify(this.matches));
    },
    methods: {
        autoComplete() {
            let thisTemp = this;
            $(".match:focus").autocomplete({
                minLength: 0,
                source: this.listVideo,
                // focus: function( event, ui ) {
                //     $( ".match:focus").val( ui.item.title);
                //     return false;
                // },
                select: function (event, ui) {
                   thisTemp.getUrlMatch(ui.item.id,(url)=>{
                        if(url !== ""){
                            $(".match:focus").val(url);
                        }
                    });
                    return false;
                }
            })
                .autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + "<img style='width: 100px;height: 75px' src='" + item.thumb + "'>" + item.title + "</div>")
                    .appendTo(ul);
            };
        },
        onVideoNameKeyUp(nameSearch){
            this.listVideo = [];
            if($(".match:focus")){
                this.searchVideoByName(nameSearch);
                this.autoComplete();
            }
        },
        searchVideoByName(keySearch){
            console.log('Key Video Search Value:', keySearch);
            if (checkInputString(keySearch)){
                keySearch = keySearch.trim();
                let params = {
                    type: 0,
                    offset: 0,
                    keyword: encodeURIComponent(keySearch),
                    os_id: 1
                };
                const req = new Request();
                req.requestNoModal("find-post",params, (data) => {
                    let datas = data.datas;
                    if (isArray(datas)) {
                        for(let i = 0 ; i < datas.length ; i ++){
                            let temp = {
                                value: datas[i].title,
                                title: datas[i].title,
                                thumb: datas[i].thumb,
                                id: datas[i].id
                            };
                            this.listVideo.push(temp);
                        }
                    }
                    console.log("List video " + JSON.stringify(this.listVideo));
                });
            }
        },
        changeMatch(){
            // console.log("Mathchesssss : " + JSON.stringify(this.matches));
            this.$emit('changeMatch',this.matches);
        },
        getUrlMatch(postId, fn){
            const params = {
                id: postId
            };
            const req = new Request();
            req.requestNoModal("content-post", params, (data) => {
                if ( data.rc === 0){
                    fn(data.item.url);
                }else {
                    console.log("Error call api get link post");
                    fn("");
                }
            });
        }
    }
});
