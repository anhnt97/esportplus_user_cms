Vue.component('modal-view', {
    template: `
            <div class="modal-mask">
   <div class="modal-wrapper">
      <div class="modal-container">
         <h2 class="page-header">Table Name: {{item.name}}</h2>
         <div class="modal-body" style="overflow-x:auto;">
            <table>
               <thead>
                  <tr>
                     <th>User Name</th>
                     <th>Bet Value</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="user in list_user">
                     <td>{{user.user_name}}</td>
                     <td>{{formatMoney(user.amount)}}</td>
                  </tr>
               </tbody>
            </table>
            <div>
               <paginate
                  :page-count="totalPages"
                  :page-range="4"
                  :margin-pages="2"
                  :first-last-button="true"
                  :click-handler="onPagingClick"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'pagination'"
                  :page-class="'page-item'">
               </paginate>
            </div>
         </div>
         <div class="modal-footer">
            <input type="button" v-on:click.prevent="$emit('close')" class="btn btn-primary"
               value="Close"/>
            <!--<button class="modal-default-button" @click="$emit('close')">-->
            <!--CLOSE-->
            <!--</button>-->
         </div>
      </div>
   </div>
</div>
    `,
    props: ['item'],
    watch: {},
    mounted() {
        this.id_post = this.item._id;
        this.params_request.bet_table_id = this.item._id;
        this.totalPages = this.item.total;
        this.getListUser();
    },
    data() {
        return {
            id_post: "",
            busy: false,
            list_user: [],
            totalPages: 0,
            params_request: {
                offset: 1,
                bet_table_id: ""
            }
        }
    },

    methods: {
        getListUser() {
            const req = new Request();
            req.getNoModal("get-userbet", this.params_request, (data)=> {
                console.log("Total :" + JSON.stringify(data));
            this.list_user = data.rows;
            });
        },
        onPagingClick(pageNum) {
            this.params_request.offset = pageNum;
            this.getListUser();
        },
        formatMoney(money)
        {
            return money.formatMoney(0, '.', ',');
        },
    }

});