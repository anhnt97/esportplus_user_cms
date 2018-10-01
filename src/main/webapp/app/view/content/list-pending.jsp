<%-- 
    Document   : list-pending
    Created on : Jan 19, 2018, 5:37:49 PM
    Author     : daua1993
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="List upload pending">
    <jsp:attribute name="content">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Listupload pending</h1>
            </div>
        </div>
        <div class="row" id="tbl_container" style="display:none">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <label id="txt_thongke">List file upload unsucess</label>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover" id="tbl_info">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Type</th>
                                <th>Creator</th>
                                <th>Video</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="table-responsive top10">
                        <button type="button" id="btnMore" class="btn btn-outline btn-success pull-right" >More</button>
                    </div>
                </div>
            </div>
        </div>

    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <link href="${contextPath}/css/datepicker.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/js/bootstrap-datepicker.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="${contextPath}/js/tableexecute.js" type="text/javascript"></script>
        <script src="${contextPath}/app/controller/content/list-pending.js" type="text/javascript"></script>
    </jsp:attribute>
</mt:masterpage>

