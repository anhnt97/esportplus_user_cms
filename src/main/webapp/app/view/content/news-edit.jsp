<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 7/14/2018
  Time: 5:01 PM
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Edit News">
    <jsp:attribute name="content">
         <style scoped>
             .bg-img {
                 position: absolute;
                 top: 0px;
                 left: 0px;
                 width: 100%;
                 height: 100%;
                 background-repeat: no-repeat;
                 background-size: cover;
                 background-position: center center;
             }

             .thumbnail {
                 position: relative;
             }

             #box-img .thumbnail {
                 width: 200px;
                 height: 200px;
             }

             #box-cmt .thumbnail {
                 width: 250px;
                 height: 180px;
             }

             #change_image {
                 position: absolute;
                 bottom: 10px;
                 left: 10px;
             }

             .img_preview {
                 width: 250px;
                 height: 250px;
             }
         </style>
        <div id="news-edit-app">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="page-header">Edit News </h1>
                </div>
            </div>
            <div class="row" style="margin-top: 20px">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="title" class="form-control" v-model="data_update.name"
                           placeholder="title ...">
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-lg-6">
                            <label>Image thumbnail</label>
                            <div>
                                <div class="row">
                                    <div>
                                        <img id="thumbnail-news" src="#" alt="your image"/><br/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="row">
                                    <div style="margin-top: 20px; margin-left: 15px">
                                            <%--<input style="display: none" ref="chooseImageFile" type="file" v-on:change="onImageFileChange"/>--%>
                                        <button v-on:click.prevent="show_form_upload=true" class="btn btn-primary">
                                            Upload
                                        </button>
                                        <upload-image @upload_success="onUploadSuccess($event)" :show="show_form_upload"
                                                      @close="show_form_upload=false"></upload-image>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label>Choose Categories</label>
                            <div class="form-group" id="cat-1" style="max-height: 150px; overflow-y: scroll">
                                <span v-for="option in options" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                                    <label> <input :value="option.id"
                                                   type="checkbox"
                                                   v-model="data_update.categories"/> {{option.name}}</label>
                                    <br/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Description Content</label>
                    <input type="text" id="displayContent" class="form-control" v-model="data_update.displayContent"
                           placeholder="description content ...">
                </div>
                <div class="form-group">
                    <label>Content</label>
                    <textarea class="form-control" id="originalContent" rows="10"
                              placeholder="content ...">
                            </textarea>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-lg-6">
                            <label>Tags</label>
                            <div class="form-group">
                                <input type="text" id="tags_id" class="form-control" data-role="tagsinput" value=""/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label>Start effect time</label>
                            <div class="form-group">
                                <input class="form-control datepicker" placeholder="dd/MM/yyyy" id="dateTo">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <input type="button" v-on:click.prevent="onBtnUploadClick" class="btn btn-primary"
                           value="Update news"/>
                </div>
            </div>

        </div>
    </jsp:attribute>

    <jsp:attribute name="jslink">
        <%--<script src="//cdn.ckeditor.com/4.10.0/standard/ckeditor.js"></script>--%>
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="${contextPath}/js/moment.js" type="text/javascript"></script>
        <script src="${contextPath}/js/ckeditor/ckeditor.js" type="text/javascript"></script>


        <link href="${contextPath}/js/datetime/bootstrap-datetimepicker.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/js/datetime/moment-with-locales.js" type="text/javascript"></script>
        <script src="${contextPath}/js/datetime/bootstrap-datetimepicker.js" type="text/javascript"></script>

        <script src="${contextPath}/js/adapters/jquery.js" type="text/javascript"></script>

        <script src="${contextPath}/js/jquery.matchHeight-min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/select2.full.min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/vue.js" type="text/javascript"></script>
        <script src="${contextPath}/js/hls.js" type="text/javascript"></script>
        <script src="${contextPath}/js/html2canvas.min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/plugin-drag-image.js" type="text/javascript"></script>


        <script src="${contextPath}/js/bootstrap-multiselect.js" type="text/javascript"></script>
        <link href="${contextPath}/css/bootstrap-multiselect.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/app/vue/upload-image.js" type="text/javascript"></script>

        <script src="${contextPath}/app/controller/content/news-edit.js" type="text/javascript"></script>
        <script type="text/javascript">
            CKEDITOR.replace( 'originalContent', {
                extraPlugins: 'easyimage',
                cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
                cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
            } );
        </script>

    </jsp:attribute>
</mt:masterpage>