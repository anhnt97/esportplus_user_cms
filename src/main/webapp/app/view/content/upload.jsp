<%--
  Created by IntelliJ IDEA.
  User: daua1993
  Date: 19/01/2018
  Time: 22:20
  To change this template use File | Settings | File Templates.
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Complete Upload">

    <jsp:attribute name="content">

        <div id="app">

            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Complete upload</h1>
                </div>
            </div>

            <div id="app-2">

                <div class="row" style="margin-top: 20px">

                    <div class="col-lg-8">
                        <video-component
                                v-bind:video_data="videodata"
                                v-on:create-thumb="onThumbCreated($event)"
                                v-on:data-loaded="onVideoLoadeddata($event)"/>
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
                                <row>
                                <span v-for="option in options" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                                    <label> <input :value="option.id"
                                                   type="checkbox"
                                                   v-model="dataUpload.categories"/> {{option.name}}</label>
                                    <br/>
                                </span>
                                </row>
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
                                <input type="button" v-on:click.prevent="onButtonCreateClick" class="btn btn-primary"
                                       value="Update content"/>
                            </div>
                        </div>

                    </form>

                </div>

            </div>

            <input type="file" onchange="readURL(this);" style="display:none;" id="inputfile"/>
            <canvas style="display:none;" id="myCanvas1"></canvas>

        </div>

    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>

        <link href="${contextPath}/js/datetime/bootstrap-datetimepicker.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/js/datetime/moment-with-locales.js" type="text/javascript"></script>
        <script src="${contextPath}/js/datetime/bootstrap-datetimepicker.js" type="text/javascript"></script>

        <link href="${contextPath}/css/cropper.css" rel="stylesheet">
        <script src="${contextPath}/js/cropper.js"></script>

        <script src="${contextPath}/js/jquery.matchHeight-min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/select2.full.min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/vue.js" type="text/javascript"></script>
        <script src="${contextPath}/js/hls.js" type="text/javascript"></script>

        <script src="${contextPath}/app/vue/thumb-item.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/comment-item.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/video-component.js" type="text/javascript"></script>

        <script src="${contextPath}/js/bootstrap-multiselect.js" type="text/javascript"></script>
        <link href="${contextPath}/css/bootstrap-multiselect.css" rel="stylesheet" type="text/css"/>

        <script src="${contextPath}/app/controller/content/upload.js" type="text/javascript"></script>
    </jsp:attribute>
</mt:masterpage>

