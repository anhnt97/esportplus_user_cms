<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 7/12/2018
  Time: 4:52 PM
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Upload News">
    <jsp:attribute name="content">
        <div id="upload-news-app">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="page-header">Upload News </h1>
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
                                            <img style="display: none" id="thumbnail-news" src="#" alt="your image"/><br/>
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
                                <div class="form-group" id="cat-1" style="max-height: 150px; overflow-y: scroll">
                                <span v-for="(option, index) in options" class="col-lg-6 col-md-3 col-sm-6 col-xs-6">
                                    <label> <input :value="option.id"
                                                   type="radio"
                                                   v-model="data_update_category"/> {{option.name}}</label>
                                    <br/>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description Content</label>
                        <input type="text" id="display_content" class="form-control"
                               v-model="data_update.display_content"
                               placeholder="description content ...">
                    </div>
                    <div class="form-group">
                        <label>Content</label>
                        <textarea class="form-control" id="original_content" rows="10" name="content"
                                  placeholder="content ...">
                            </textarea>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-6">
                                <label>Tags</label>
                                <div class="form-group">
                                    <input type="text" id="tags_id" class="form-control" data-role="tagsinput"
                                           value=""/>
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
                               value="Upload news"/>
                    </div>
            </div>
            <upload-image @upload_success="onUploadSuccess($event)" :show="show_form_upload" @close="show_form_upload=false"></upload-image>
        </div>
    </jsp:attribute>

    <jsp:attribute name="jslink">
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

        <script src="${contextPath}/app/controller/content/upload-news.js" type="text/javascript"></script>

        <script type="text/javascript">
            CKEDITOR.replace( 'original_content');
        </script>

    </jsp:attribute>
</mt:masterpage>