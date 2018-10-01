<%-- 
    Document   : changepassword
    Created on : Jan 11, 2018, 8:47:25 PM
    Author     : daua1993
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Change password">
    <jsp:attribute name="content">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Change password</h1>
            </div>
        </div>
        <form role="form" id="form1" method="post">
            <div class="row">
                <div class="col-lg-4">
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" placeholder="Password" id="oldpass" name="oldpass">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <div class="form-group">
                        <label>New password</label>
                        <input type="password" class="form-control" placeholder="New password" id="newpass" name="newpass">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <div class="form-group">
                        <label>Re-enter new password</label>
                        <input type="password" class="form-control" placeholder="Re-enter new password" id="reenterpass" name="reenterpass">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <button type="submit" class="btn btn-default" id="btnChange">Change password</button>
                </div>
            </div>
        </form>
    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <link href="${contextPath}/css/datepicker.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/js/bootstrap-datepicker.js" type="text/javascript"></script>
        <script src="${contextPath}/js/tableexecute.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="${contextPath}/js/plugins/validatorObj.js" type="text/javascript"></script>
        <script src="${contextPath}/app/controller/changepassword.js" type="text/javascript"></script>
    </jsp:attribute>
</mt:masterpage>

