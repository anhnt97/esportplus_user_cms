<%-- 
    Document   : content-addnew
    Created on : Jan 11, 2018, 5:05:31 PM
    Author     : daua1993
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<mt:masterpage title="Thêm mới nội dung">
    <jsp:attribute name="content">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Thêm mới nội dung</h1>
            </div>
        </div>

<!--        <form role="form">
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label>Link youtube</label>
                        <input class="form-control" placeholder="Link youtube" id="link">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <button type="submit" class="btn btn-default" id="btnAdd">Lấy thông tin</button>
                </div>
            </div>
        </form>-->

        <div id="root"></div>

    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
        <script type='text/babel' src="${contextPath}/app/controller/content/content-addnew.js"
                type="text/javascript"></script>
    </jsp:attribute>
</mt:masterpage>
