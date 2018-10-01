<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 8/2/2018
  Time: 8:45 AM
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Upload Post Series">
    <jsp:attribute name="content">
        <div id="upload-posts-manager-app">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Add New Post Series</h1>
                </div>
            </div>
            <div style="padding-left: 30px">
                <div class="row" style="margin-top: 20px">
                        <div class="form-group">
                            <label >Game mode</label>
                            <input class="form-control" type="text" id="game_mode" placeholder="Game mode" maxlength="50" size="20" v-model="create_request.game_mode"
                            >
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-8">
                                    <label for="lblTeam1">Team 1:</label>
                                    <input class="form-control" type="text" id="lblTeam1" ref = "lblTeam1" name="lblTeam1" placeholder="search member team 1" maxlength="50" size="20" v-model="team1"
                                           v-on:keyup="onMemberNameKeyUp($event.target.value)" >
                                </div>
                                <div class="col-sm-2">
                                    <label for="lblScore1">Score:</label>
                                    <input class="form-control" type="text" pattern="\d*" maxlength="2" ref="lblScore1" id="lblScore1" name="lblScore1"
                                            style="width: 50px;" v-model="create_request.score1">
                                    </input>
                                </div>
                            </div>

                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-8">
                                    <label for="lblTeam2">Team 2:</label>
                                    <input class="form-control" type="text" id="lblTeam2" ref = "lblTeam2" name="lblTeam2" placeholder="search member team 2" maxlength="50" size="20" v-model="team2"
                                           v-on:keyup="onMemberNameKeyUp($event.target.value)" >
                                </div>
                                <div class="col-sm-2">
                                    <label for="lblScore2">Score:</label>
                                    <input class="form-control" type="text" pattern="\d*" maxlength="2" ref="lblScore2" id="lblScore2" name="lblScore2"
                                           style="width: 50px;" v-model="create_request.score2">
                                    </input>
                                </div>
                            </div>

                        </div>
                        <div class="form-group">
                            <div class="btn btn-primary" v-on:click.prevent="onClickAddTeam"> Add New Team </div>
                        </div>
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" id="title" class="form-control" v-model="create_request.title"
                                   placeholder="title ...">
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-lg-6">
                                    <label>Image thumbnail</label>
                                    <div>
                                        <div class="row">
                                            <div>
                                                <img style="display: none" id="thumbnail-news" src="#" alt="your image"/><br/>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="row">
                                            <div style="margin-top: 20px; margin-left: 15px">
                                                <button v-on:click.prevent="show_up=true"
                                                        class="btn btn-primary">
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <label>Choose Categories</label>
                                    <div class="form-group" id="cat-1" style="max-height: 150px; overflow-y: auto">

                                    <span v-for="option in options" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                                                <label><input :value="option.id"
                                                              type="radio" v-model="post_manager_category"/> {{option.name}}</label>
                                                <br/>
                                    </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Description Content</label>
                            <textarea rows="5" type="text" id="display_content" class="form-control"
                                      v-model="create_request.description"
                                      placeholder="description content ...">
                            </textarea>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-lg-6">
                                    <label>Tournaments</label>
                                    <div class="form-group">
                                        <input type="text" id="tournaments" class="form-control"
                                               v-model="create_request.tournaments"
                                               placeholder="tournament content ...">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <label>Tags</label>
                                    <div class="form-group">
                                        <input type="text" id="tags_id" class="form-control" data-role="tagsinput"
                                               value=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="button" v-on:click.prevent="onButtonCreateClick" class="btn btn-primary"
                                   value="Create content"/>
                        </div>
                    <upload-image v-on:upload_success="onUploadThumbSuccess($event)" :show="show_up" @close="show_up=false"></upload-image>
                </div>
            </div>
        </div>
    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="${contextPath}/js/moment.js" type="text/javascript"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

         <link href="${contextPath}/js/datetime/bootstrap-datetimepicker.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/js/datetime/moment-with-locales.js" type="text/javascript"></script>
        <script src="${contextPath}/js/datetime/bootstrap-datetimepicker.js" type="text/javascript"></script>

        <script src="${contextPath}/js/vue.js" type="text/javascript"></script>
        <script src="${contextPath}/js/hls.js" type="text/javascript"></script>
        <script src="${contextPath}/js/html2canvas.min.js" type="text/javascript"></script>


        <script src="${contextPath}/js/bootstrap-multiselect.js" type="text/javascript"></script>
        <link href="${contextPath}/css/bootstrap-multiselect.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/app/vue/upload-image.js" type="text/javascript"></script>
        <script src="${contextPath}/app/controller/content/upload-posts-manager.js" type="text/javascript"></script>

    </jsp:attribute>
</mt:masterpage>