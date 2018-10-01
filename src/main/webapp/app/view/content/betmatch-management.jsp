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
                    <h1 class="page-header">Bet Match Management</h1>
                </div>
            </div>
            <div class="row">
                <form>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <input id="name-team-select" class="form-control" placeholder="Search bet match" v-model="posts_manager_select"/>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <button type="submit" class="btn btn-primary" v-on:click.prevent="onSearchClick">Search</button>
                        <button type="submit" class="btn btn-primary" v-on:click.prevent="onAddNewPostsManagerClick">Add New Bet Match</button>
                    </div>
                </form>
            </div>

            <div>
                <div v-for="item in items">
                    <bet-match-manager-item :post="item" v-on:deleted="deleteItem(item._id)"
                                            v-on:approve="approveItem(item)"
                                            v-on:offline="offlineItem(item)"/>
                </div>
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
        <script src="${contextPath}/js/vue.js" type="text/javascript"></script>
        <script src="${contextPath}/js/tableexecute.js" type="text/javascript"></script>

        <script src="https://unpkg.com/vuejs-paginate@0.9.0"></script>
        <script src="${contextPath}/app/vue/bet-match-manager-item.js" type="text/javascript"></script>
        <script  src="${contextPath}/app/controller/content/betmatch-management.js" type="text/javascript"></script>
    </jsp:attribute>
</mt:masterpage>
