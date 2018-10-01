<%--
  Created by IntelliJ IDEA.
  User: daua1993
  Date: 20/04/2018
  Time: 22:38
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="User Profile">
    <jsp:attribute name="content">
        <style>
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
                width: 250px;
                height: 250px;
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
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">User Profile</h1>
            </div>
        </div>
        <form role="form">

            <div class="row">

                <div class="col-lg-6" id="box-img">
                    <div class="thumbnail">
                        <div class="bg-img img-thumbnail"
                             style=""
                             id="pic1"></div>
                        <button type="button" id="change_image" class="btn btn-primary xs">Change</button>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label>Account Name</label>
                        <input class="form-control" placeholder="Account name" id="acc_name">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <button type="button" class="btn btn-default" id="btn_edit">Edit Profile</button>
                </div>
            </div>
            <div style="display: none">
                <input type="file" id="choose_image"/>
            </div>
        </form>
        <div class="modal fade" id="modalCrop">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">Crop the photo</h4>
                    </div>
                    <div class="modal-body">
                        <img src="" id="image" style="max-width: 100%;">
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group pull-left" role="group">
                            <button type="button" class="btn btn-default js-zoom-in" id="btn_zoom_in">
                                <span class="glyphicon glyphicon-zoom-in"></span>
                            </button>
                            <button type="button" class="btn btn-default js-zoom-out" id="btn_zoom_out">
                                <span class="glyphicon glyphicon-zoom-out"></span>
                            </button>
                        </div>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" id="btn_crop" class="btn btn-primary js-crop-and-upload">Crop
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </jsp:attribute>
    <jsp:attribute name="jslink">
        <link rel="stylesheet" href="${contextPath}/css/cropper.css">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="${contextPath}/js/cropper.js"></script>
        <script src="${contextPath}/app/controller/profile.js" type='text/javascript'></script>
    </jsp:attribute>
</mt:masterpage>
