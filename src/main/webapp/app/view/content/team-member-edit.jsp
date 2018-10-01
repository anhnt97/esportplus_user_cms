<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 8/1/2018
  Time: 3:17 PM
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Update Team And Member">
    <jsp:attribute name="content">
        <div id="team-member-edit-app">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="page-header">Update Team And Member </h1>
                </div>
            </div>
            <div class="row" style="margin-top: 20px">
                <h3>Update Team</h3>
                <br>
                    <div class="form-group">
                        <label>Name Team</label>
                        <input type="text" id="name-team" class="form-control" v-model="update_team.name"
                               placeholder="Name team ...">
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-6">
                                <label>Icon Team</label>
                                <div>
                                    <div class="row">
                                        <div>
                                            <img v-bind:src="update_team.icon" style="display: none" id="icon-team" alt="your image"/><br/>
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
                                                   v-model="update_team_category"/> {{option.name}}</label>
                                    <br/>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3>Member Team</h3>
                    <div class="form-group">
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-info" v-for="member in list_member">
                                {{member.name}}
                                <span class="pull-right">
                                    <span class="btn btn-danger" v-on:click.prevent="onBtnDeleteMember(member)">
                                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                    </span>
                                </span>
                            </li>
                        </ul>
                        <span class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        </span>
                    </div>
                    <div class="form-group">
                        <input type="button" v-on:click.prevent="onBtnUpdateTeam" class="btn btn-primary"
                               value="Update Team"/>
                    </div>
                <upload-image @upload_success="onUploadSuccess($event)" :show="show_form_upload" @close="show_form_upload=false"></upload-image>

                <!-- Modal -->
                <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Add Member</h4>
                            </div>
                            <div class="modal-body">
                                <p>Member Name :</p>
                                <input type="text" id="new-member" class="form-control" v-model="member_name"
                                       placeholder="Member Name ...">
                            </div>
                            <div class="modal-footer">
                                <button type="button" v-on:click.prevent="onBtnAddMember()"  class="btn btn-default" data-dismiss="modal">Add</button>
                            </div>
                        </div>

                    </div>
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
        <script src="${contextPath}/app/controller/content/team-member-edit.js" type="text/javascript"></script>

    </jsp:attribute>
</mt:masterpage>