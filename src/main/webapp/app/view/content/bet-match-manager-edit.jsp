<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 8/3/2018
  Time: 9:33 AM
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Edit Bet Match">
    <jsp:attribute name="content">
        <div id="bet-match-manager-edit-app">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Edit Bet Match</h1>
                </div>
            </div>
            <div style="padding-left: 30px">
                <div class="row" style="margin-top: 20px">

                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-8">
                                <label>Title</label>
                                <input type="text" id="title" class="form-control" v-model="update_request.title"
                                       placeholder="title ...">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-8">
                                <label>Game mode</label>
                                <input class="form-control" type="text" id="game_mode" placeholder="Game mode"
                                       maxlength="50" size="20" v-model="update_request.game_mode"
                                >
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-8">
                                <label for="lblTeam1">Team 1:</label>
                                <input class="form-control" type="text" id="lblTeam1" ref="lblTeam1" name="lblTeam1"
                                       placeholder="search member team 1" maxlength="50" size="20" v-model="team1"
                                       v-on:keyup="onMemberNameKeyUp($event.target.value)">
                            </div>
                            <div class="col-sm-2">
                                <label for="lblScore1">Score:</label>
                                <input class="form-control" type="text" pattern="\d*" maxlength="2" ref="lblScore1"
                                       id="lblScore1" name="lblScore1"
                                       style="width: 50px;" v-model="update_request.score1">
                                </input>
                            </div>
                        </div>

                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-8">
                                <label for="lblTeam2">Team 2:</label>
                                <input class="form-control" type="text" id="lblTeam2" ref="lblTeam2" name="lblTeam2"
                                       placeholder="search member team 2" maxlength="50" size="20" v-model="team2"
                                       v-on:keyup="onMemberNameKeyUp($event.target.value)">
                            </div>
                            <div class="col-sm-2">
                                <label for="lblScore2">Score:</label>
                                <input class="form-control" type="text" pattern="\d*" maxlength="2" ref="lblScore2"
                                       id="lblScore2" name="lblScore2"
                                       style="width: 50px;" v-model="update_request.score2">
                                </input>
                            </div>
                        </div>
                    </div>


                    <div class="form-group">
                        <div class="btn btn-primary" v-on:click.prevent="onClickAddTeam"> Add New Team</div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class=" col-sm-8" v-for="(ls, index) in list_link_stream">
                                <label>Link Stream {{index + 1}}</label>
                                <input class="form-control" type="text" id="input_link" placeholder="Link Stream"
                                       maxlength="200" size="20" v-model="ls.link_stream"
                                >

                            </div>
                        </div>
                        <div class="footer" style="margin-top: 10px">
                                <span style="margin-top: 15px" class="btn btn-primary"
                                      v-on:click.prevent="onBtnAddStream">
                                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                </span>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-6">
                                <label>Image thumbnail</label>
                                <div>
                                    <div class="row">
                                        <div>
                                            <img style="display: none" id="thumbnail-news"
                                                 v-bind:src="update_request.thumb"
                                                 alt="your image"/><br/>
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
                                                              :checked="option.id == update_request.categories.id"
                                                              type="checkbox" v-model="update_request.categories"/> {{option.name}}</label>
                                                <br/>
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-6">
                                <label>Description Content</label>
                                <textarea rows="5" type="text" id="display_content" class="form-control"
                                          v-model="update_request.description"
                                          placeholder="description content ...">
                            </textarea>
                            </div>
                            <div class="col-lg-4">
                                <label>Start time</label>
                                <div class="form-group">
                                    <input class="form-control datepicker" placeholder="dd/MM/yyyy" id="dateTo">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-6">
                                <label>Tournaments</label>
                                <div class="form-group">
                                    <input type="text" id="tournaments" class="form-control"
                                           v-model="update_request.tournaments"
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
                        <div class="row">
                            <%--<div class="col-sm-4">--%>
                                <%--<label for="set_select">Current Set:</label>--%>

                                <%--<select style="width: auto" class="form-control" v-model.number="update_request.set"--%>
                                        <%--id="set_select">--%>
                                    <%--<option value="1" selected>1</option>--%>
                                    <%--<option value="2">2</option>--%>
                                    <%--<option value="3">3</option>--%>
                                    <%--<option value="4">4</option>--%>
                                    <%--<option value="5">5</option>--%>
                                <%--</select>--%>
                            <%--</div>--%>
                            <%--<div class="col-sm-4">--%>
                                <%--<label for="match_select">Current Match:</label>--%>

                                <%--<select style="width: auto" class="form-control" v-model.number="update_request.match"--%>
                                        <%--id="match_select">--%>
                                    <%--<option value="1" selected>1</option>--%>
                                    <%--<option value="2">2</option>--%>
                                    <%--<option value="3">3</option>--%>
                                    <%--<option value="4">4</option>--%>
                                    <%--<option value="5">5</option>--%>
                                    <%--<option value="6">6</option>--%>
                                    <%--<option value="6">7</option>--%>
                                <%--</select>--%>
                            <%--</div>--%>

                            <%--<div class="col-sm-4">--%>
                                <%--<label for="state_select">Bet Status</label>--%>
                                <%--<select style="width: auto" class="form-control"--%>
                                        <%--v-model.number="update_request.bet_status" id="state_select">--%>
                                    <%--<option value="0" selected>ON</option>--%>
                                    <%--<option value="2">OFF</option>--%>
                                <%--</select>--%>

                            <%--</div>--%>

                            <div class="col-sm-8">
                                <label>Bet Mode</label>
                                <div class="form-group" id="bet-mode" style="max-height: 150px; overflow-y: auto">

                                    <span v-for="bet_item in bet_modes" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                                                <label><input :value="bet_item.bet_mode._id"
                                                              checked="checked"
                                                              type="checkbox"
                                                              disabled="disabled"/> {{bet_item.bet_mode.bet_name}}</label>
                                    </span>

                                </div>
                            </div>

                        </div>

                    </div>


                    <div class="form-group">
                        <input type="button" v-on:click.prevent="onButtonUpdateClick" class="btn btn-primary"
                               value="Edit content"/>
                    </div>
                    <upload-image v-on:upload_success="onUploadThumbSuccess($event)" :show="show_up"
                                  @close="show_up=false"></upload-image>
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

        <script src="${contextPath}/js/jquery.mockjax.js" type="text/javascript"></script>
        <script src="${contextPath}/js/jquery.autocomplete.js" type="text/javascript"></script>
         <link href="${contextPath}/js/datetime/bootstrap-datetimepicker.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/js/datetime/moment-with-locales.js" type="text/javascript"></script>
        <script src="${contextPath}/js/datetime/bootstrap-datetimepicker.js" type="text/javascript"></script>

        <script src="${contextPath}/js/vue.js" type="text/javascript"></script>
        <script src="${contextPath}/js/hls.js" type="text/javascript"></script>

        <script src="${contextPath}/js/bootstrap-multiselect.js" type="text/javascript"></script>
        <link href="${contextPath}/css/bootstrap-multiselect.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/app/vue/upload-image.js" type="text/javascript"></script>
        <script src="${contextPath}/app/controller/content/bet-match-manager-edit.js" type="text/javascript"></script>

    </jsp:attribute>
</mt:masterpage>