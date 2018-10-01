Vue.component('tree-set',{
    template: `
        <li :class="[isFolder ? 'folder' : 'file']">
            <label
              v-if="!isFolder"
              :class="{'open': open}"
              @click="toggle"
              @dblclick="changeType">
              <img v-if="!isFolder" v-bind:src="model.thumb" alt="" style="width: 100px;height: 75px">
              {{model.title}}
              <span>Match {{model.match}}</span>
            </label>
            <label
              v-if="isFolder"
              :class="{'open': open}"
              @click="toggle"
              @dblclick="changeType">
              Set {{model.set}}  
              <span>{{model.set}}</span>
            </label>
            <ul v-show="open" v-if="isFolder" :class="{'open': open}">
              <tree-set
                v-for="(model, index) in model.matches"
                :key="index"
                :model="model">
              </tree-set>
            </ul>
        </li>
    `,
    props:['model'],
    watch: {
        // checkMatch:function () {
        //     if (this.checkMatch.length === 1)
        //     this.$emit('checkMatch',this.checkMatch);
        // }
    },
    data: function () {
        return {
            open:false,
            items:[],
            checkMatch: []
        }
    },
    computed: {
        isFolder: function() {
            return this.model.matches;
        }
    },
    methods: {
        toggle: function() {
            if (this.isFolder) {
                this.open = !this.open;
            }
        },
        changeType: function() {
            if (!this.isFolder) {
                Vue.set(this.model, "matches", []);
                this.open = true;
            }
        },
        addMatch: function() {
            // this.items.push({
            //     name: "Match " + (this.model.children.length + this.items.length + 1),
            //     set: this.model.name,
            //     match:this.model.children.length + this.items.length + 1
            // });
            // this.model.children.push({
            //     name: "Match " + (this.model.children.length + 1),
            //     id: "Match " + (this.model.children.length + 1),
            //     thumb: "#",
            //     check: true
            // });
            // alert(JSON.stringify(this.model.children));
        },
        removeMatch: function (item) {
            // this.items.splice(this.items.indexOf(item),1);
            //this.model.children.splice(this.model.children.indexOf(item),1);
        },
    }
});