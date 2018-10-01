<%-- 
    Document   : content-upload-gif
    Created on : Jan 12, 2018, 8:48:14 AM
    Author     : daua1993
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<mt:masterpage title="Add new GIF">

    <jsp:attribute name="content">

        <div id="app">

            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Add new GIF</h1>
                </div>
            </div>

            <form role="form">

                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <button type="button" v-on:click.prevent="$refs.chooseFileGif.click()"
                                    class="btn btn-default"><strong>Choose GIF file to upload</strong>
                            </button>
                        </div>
                    </div>
                </div>

                <div style="display: none" v-bind:style="display_image">

                    <div class="row">
                        <div class="col-lg-6">
                            <img id="blah" src="#" alt="your image"/><br/>
                            <p style="margin-top: 5px"><strong>{{fileInfo}}</strong></p>
                        </div>
                    </div>

                    <div class="row" style="margin-top: 20px">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <button type="submit" v-on:click.prevent="onUploadImageClick" class="btn btn-primary">
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </form>

            <input style="display: none" type="file" ref="chooseFileGif" v-on:change="onGifFileChange"/>

        </div>

    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="${contextPath}/js/vue.js" type="text/javascript"></script>
        <script src="${contextPath}/app/controller/content/content-upload-gif.js" type="text/javascript"></script>
    </jsp:attribute>
</mt:masterpage>

