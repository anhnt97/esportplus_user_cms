<%-- 
    Document   : youtube-edit
    Created on : Jan 24, 2018, 7:24:18 PM
    Author     : daua1993
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Content detail">
    <jsp:attribute name="content">
        <div id="app">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Content detail</h1>
                </div>
            </div>
            <div>
                <div class="row" style="margin-top: 20px">
                    <div class="col-lg-8">
                        <video-component
                                v-bind:video_data="videodata"
                                v-bind:post_id="post_id"
                                v-on:create-thumb="onThumbCreated($event)"
                                v-on:data-loaded="onVideoLoadeddata($event)"
                                ref = "video_component"
                                v-bind:duration_data = "total_time"
                                v-on:trim_video = "onVideoTrim($event)"/>
                    </div>

                    <div class="col-lg-4">
                        <div class="list-thumb" id="list-thumb" style="padding-bottom: 45px">
                            <list-thumb-item v-bind:datas="thumblist"/>
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-top: 20px">

                    <form role="form">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Choose match parent</label>
                                <input type="text" id="searchMatchParent" class="form-control" v-model.lazy="match_parent_title"
                                       v-on:keyup="onMatchParentNameKeyUp($event.target.value)"  placeholder="search match parent ...">
                            </div>
                            <div class="form-group">
                                <label>Information match parent</label>
                                <%--<ul class="cd-accordion-menu">--%>
                                    <%--<div v-for="item in dataTest" v-bind:id="item.name">--%>
                                        <%--<tree-set :model="item" ></tree-set>--%>
                                    <%--</div>--%>
                                <%--</ul>--%>
                                <div class="row">
                                    <div class="col-sm-4">
                                        <label for="set_select">Select set:</label>

                                        <select style="width: auto" class="form-control" v-model.number="set_select" id="set_select">
                                            <option value="1" selected>1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <label for="match_select">Select match:</label>

                                        <select style="width: auto" class="form-control" v-model.number="match_select" id="match_select">
                                            <option value="1" selected>1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" id="title" class="form-control" v-model="title"
                                       placeholder="title ...">
                            </div>
                            <div class="form-group">
                                <label>Content</label>
                                <textarea class="form-control" v-model="content" id="content" rows="10"
                                          placeholder="content ..."></textarea>
                            </div>
                            <div class="form-group">
                                <label>Tags</label><br/>
                                <input type="text" id="tags_id" class="form-control" value="" data-role="tagsinput"/>
                            </div>

                        </div>

                        <div class="col-lg-6">
                            <label>Choose Categories</label>
                            <div class="form-group" id="cat-1" style="max-height: 150px; overflow-y: scroll">
                                <span v-for="option in options" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                                    <label> <input :value="option.id"
                                                   type="radio"
                                                   v-model="data_update.categories"/> {{option.name}}</label>
                                    <br/>
                                </span>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <label>Start effect time</label>
                            <div class="form-group">
                                <input class="form-control datepicker" placeholder="dd/MM/yyyy" id="dateTo">
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="form-group">
                                <input type="button" v-on:click.prevent="onBtnUpdateClick" class="btn btn-primary"
                                       value="Update content"/>
                            </div>
                        </div>

                    </form>

                </div>

                <div>

                    <div class="row">
                        <div class="col-lg-12">
                            <ul class="list-group">
                                <li class="list-group-item" v-for="comment in comments">
                                    <comment-item v-bind:comment="comment"
                                                  v-on:deleted="onItemCommentDelete(comment._id)"></comment-item>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="row" v-if="show_button_more">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <input type="button" v-on:click="getComment()" class="btn btn-primary"
                                       value="More comment"/>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <canvas style="display:none;" id="myCanvas1"></canvas>

        </div>

    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

        <link href="${contextPath}/js/datetime/bootstrap-datetimepicker.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/js/datetime/moment-with-locales.js" type="text/javascript"></script>
        <script src="${contextPath}/js/datetime/bootstrap-datetimepicker.js" type="text/javascript"></script>

        <link href="${contextPath}/css/cropper.css" rel="stylesheet">
        <script src="${contextPath}/js/cropper.js"></script>

        <script src="${contextPath}/js/jquery.matchHeight-min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/select2.full.min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/vue.js" type="text/javascript"></script>
        <script src="${contextPath}/js/hls.js" type="text/javascript"></script>
        <script src="${contextPath}/js/tableexecute.js" type="text/javascript"></script>

        <script src="${contextPath}/app/vue/thumb-item.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/comment-item.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/video-component.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/trim_video_component.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/tree-set-component.js" type="text/javascript"></script>

        <script src="${contextPath}/js/bootstrap-multiselect.js" type="text/javascript"></script>
        <link href="${contextPath}/css/bootstrap-multiselect.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/app/controller/content/youtube-edit.js" type="text/javascript"></script>
    </jsp:attribute>
</mt:masterpage>

