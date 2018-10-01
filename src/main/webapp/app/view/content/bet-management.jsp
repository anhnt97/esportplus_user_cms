<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 8/3/2018
  Time: 8:52 AM
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Bet match management">
    <jsp:attribute name="content">
        <div id="posts-manager-root">

            <div class="row">
                <div class="col-lg-12">
                    <h2 class="page-header">{{title_post}}</h2>
                </div>
            </div>

            <div class="row">
                <label>Bet Status: {{generateBetStatus()}}</label>
                <div class="form-group">
                    <input type="button" v-on:click.prevent="onTurnOffBetMatch" class="btn btn-primary"
                           :value="generateButtonBetStatus()"/>
                </div>
            </div>

            <div class="row">
                <h3 class="page-header">List Bet Table</h3>
            </div>

            <div style="overflow-x:auto;">

                    <%--<div v-for="item in items">--%>
                    <%--<bet-manager-item :post="item" v-on:deleted="deleteItem(item._id)"--%>
                    <%--v-on:approve="approveItem(item)"/>--%>
                    <%--</div>--%>
                <table>
                    <thead>
                    <tr>
                        <th>Table Name</th>
                        <th>Bank Name</th>
                        <th>Bank choose</th>
                        <th>Max Amount</th>
                        <th>Min Amount</th>
                        <th>Current Bet</th>
                        <th>Table Status</th>
                        <th>Bet Type</th>
                        <th>Created at</th>
                        <th>List User Bet</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="post in items">
                        <td>{{post.name}}</td>
                        <td>{{post.banker_name}}</td>
                        <td>{{post.banker_con.name}}</td>
                        <td>{{formatMoney(post.max_amount)}}</td>
                        <td>{{formatMoney(post.min_amount)}}</td>
                        <td>{{formatMoney(post.current_amount)}}</td>
                        <td>{{convertStatus(post.bet_status)}}</td>
                        <td>{{post.bet_match_condition.bet_mode.bet_name}}</td>
                        <td>{{convertTime(post.created_at)}}</td>
                        <td>
                            <input type="button" v-on:click.prevent="showModalFunc(post)"
                                   class="btn btn-primary" value="Show"/>
                            <%--<button id="show-modal" v-on:click.prevent="showModalFunc(post)">Show</button>--%>
                        </td>
                        <td>
                            <input type="button" v-on:click.prevent="onButtonUpdate(post._id, post.bet_status)"
                                   class="btn btn-primary"
                                   :value="genValue(post.bet_status)"/>
                        </td>
                    </tr>
                    </tbody>

                </table>

            </div>

            <div>
                <paginate
                        :page-count="totalPages"
                        :page-range="4"
                        :margin-pages="2"
                        :initial-page="paging.selected_page"
                        :first-last-button="true"
                        :click-handler="onPagingClick"
                        :prev-text="'Prev'"
                        :next-text="'Next'"
                        :container-class="'pagination'"
                        :page-class="'page-item'">
                </paginate>
            </div>

                <%--<div class="row">--%>
                <%--<input type="button" v-on:click.prevent="onButtonUpdateAllTable" class="btn btn-primary"--%>
                <%--value="Lock Bet All Table"/>--%>
                <%--</div>--%>

            <div class="row">
                <h3 class="page-header">Update Result Bet</h3>
            </div>

            <div class="row">
                    <%--<div v-for="bet_item in bet_modes">--%>

                    <%--</div>--%>

                <div style="overflow-x:auto;">
                    <table>
                        <thead>
                        <tr>
                            <th>Bet Name</th>
                            <th>Set</th>
                            <th>Match</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="bet_item in bet_modes">
                            <td>{{bet_item.bet_mode.bet_name}}</td>
                            <td>{{bet_item.set}}</td>
                            <td>{{bet_item.match}}</td>
                            <td>
                                <bet-condition-item :post="bet_item" v-on:update_result="onUpdateResult"
                                                    :bet_status="current_bet_status">
                                </bet-condition-item>
                            </td>
                        </tr>
                        </tbody>

                    </table>

                </div>

            </div>


            <div class="row">
                <h3 class="page-header">Update Set/Match</h3>
            </div>

            <div class="row">

                <div class="form-group">
                    <div class="col-sm-2">
                        <label for="set_select">Current Set:</label>

                        <select style="width: auto" class="form-control" v-model.number="update_request.set"
                                id="set_select">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div class="col-sm-2">
                        <label for="match_select">Current Match:</label>

                        <select style="width: auto" class="form-control" v-model.number="update_request.match"
                                id="match_select">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="6">7</option>
                        </select>
                    </div>


                        <%--<div class="col-sm-4">--%>
                        <%--<label for="state_select">Bet Status</label>--%>
                        <%--<select style="width: auto" class="form-control"--%>
                        <%--v-model.number="update_request.bet_status" id="state_select">--%>
                        <%--<option value="0" selected>ON</option>--%>
                        <%--<option value="2">OFF</option>--%>
                        <%--</select>--%>

                        <%--</div>--%>

                </div>
            </div>

            <div class="row">
                <h3 class="page-header"></h3>
            </div>
            <div class="row">
                <div class="form-group">
                    <input type="button" v-on:click.prevent="onButtonUpdateSetMatch" class="btn btn-primary"
                           value="Update Bet Info"/>
                </div>
            </div>


            <div class="row">
            </div>
            <modal-view v-if="showModal" @close="showModal = false" :item="modal_data"></modal-view>

        </div>
    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="${contextPath}/js/moment.js" type="text/javascript"></script>
        <link href="${contextPath}/css/datepicker.css" rel="stylesheet" type="text/css"/>
        <link href="${contextPath}/css/vue.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/js/bootstrap-datepicker.js" type="text/javascript"></script>
        <script src="${contextPath}/js/jquery.matchHeight-min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/select2.full.min.js" type="text/javascript"></script>


        <script src="${contextPath}/js/sockjs.min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/stomp.min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/vue.js" type="text/javascript"></script>
        <script src="${contextPath}/js/tableexecute.js" type="text/javascript"></script>

        <script src="https://unpkg.com/vuejs-paginate@0.9.0"></script>
        <script src="${contextPath}/js/vue-infinite-scroll.js"></script>
        <script src="${contextPath}/app/vue/modal_view.js"></script>
        <script src="${contextPath}/app/vue/bet-manager-item.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/bet-condition-item.js" type="text/javascript"></script>
        <script src="${contextPath}/app/websocket/StompController.js" type="text/javascript"></script>
        <script src="${contextPath}/app/controller/content/bet-management.js" type="text/javascript"></script>
    </jsp:attribute>
</mt:masterpage>
