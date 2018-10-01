<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 7/31/2018
  Time: 4:52 PM
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Add Team or Member">
    <jsp:attribute name="content">
        <div id="add-team-app">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="page-header">Add Team And Member </h1>
                </div>
            </div>
            <div class="row" style="margin-top: 20px">
                <h3>Add Team</h3>
                <br>
                <form role="form">
                    <div class="form-group">
                        <label>Name Team</label>
                        <input type="text" id="name-team" class="form-control" v-model="add_team.team_name"
                               placeholder="Name team ...">
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-6">
                                <label>Icon Team</label>
                                <div>
                                    <div class="row">
                                        <div>
                                            <img v-bind:src="add_team.team_icon" style="display: none" id="icon-team" alt="your image"/><br/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div style="margin-top: 20px; margin-left: 15px">
                                                <%--<input style="display: none" ref="chooseImageFile" type="file"--%>
                                                <%--v-on:change="onImageFileChange"/>--%>
                                            <button v-on:click.prevent="show_form_upload=true"
                                                    class="btn btn-primary">
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <label>Choose Categories</label>
                                <div class="form-group" id="cat-1" style="max-height: 150px; overflow: auto">
                                <span v-for="option in options" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                                    <label> <input :value="option.id"
                                                   type="radio"
                                                   v-model="add_team_category"/> {{option.name}}</label>
                                    <br/>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="button" v-on:click.prevent="onBtnAddTeam" class="btn btn-primary"
                               value="Add Team"/>
                    </div>
                </form>
                <upload-image @upload_success="onUploadSuccess($event)" :show="show_form_upload" @close="show_form_upload=false"></upload-image>
            </div>
            <div class="row" style="margin-top: 20px">
                <h3>Add Member</h3>
                <br>
                <form role="form">
                    <div class="form-group">
                        <label>Choose Team</label>
                        <input type="text" id="name-team-select" class="form-control" v-model.lazy="name_team_select"
                               v-on:keyup="onTeamNameKeyUp($event.target.value)"  placeholder="Search name team ...">
                    </div>
                    <div class="form-group">
                        <label>Name Member</label>
                        <input type="text" id="name-member-select" class="form-control" v-model="member_name"
                               placeholder="Name member ...">
                    </div>
                    <div class="form-group">
                        <input type="button" v-on:click.prevent="onBtnAddMember" class="btn btn-primary"
                               value="Add Member"/>
                    </div>
                </form>
            </div>
            <br>
        </div>
    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="${contextPath}/js/moment.js" type="text/javascript"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>



        <script src="${contextPath}/js/vue.js" type="text/javascript"></script>
        <script src="${contextPath}/js/hls.js" type="text/javascript"></script>
        <script src="${contextPath}/js/html2canvas.min.js" type="text/javascript"></script>


        <script src="${contextPath}/js/bootstrap-multiselect.js" type="text/javascript"></script>
        <link href="${contextPath}/css/bootstrap-multiselect.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/app/vue/upload-image.js" type="text/javascript"></script>
        <script src="${contextPath}/app/controller/content/add-team.js" type="text/javascript"></script>

    </jsp:attribute>
</mt:masterpage>