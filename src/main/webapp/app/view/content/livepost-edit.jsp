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
<mt:masterpage title="Edit Live Post">
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
        <div id="livepost-edit">
            <component :is="livenow-component"></component>

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
        <script src="${contextPath}/js/tableexecute.js" type="text/javascript"></script>

        <script src="${contextPath}/js/bootstrap-multiselect.js" type="text/javascript"></script>
        <link href="${contextPath}/css/bootstrap-multiselect.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/app/vue/upload-image.js" type="text/javascript"></script>

        <script src="${contextPath}/app/vue/livenow-component.js" type="text/javascript"></script>

    </jsp:attribute>
</mt:masterpage>