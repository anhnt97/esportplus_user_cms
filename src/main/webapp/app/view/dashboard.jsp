<%-- 
    Document   : dashboard
    Created on : Jan 11, 2018, 4:31:53 PM
    Author     : daua1993
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Dashboard">
    <jsp:attribute name="content">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Dash board</h1>
            </div>
        </div>

    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
    </jsp:attribute>
</mt:masterpage>
