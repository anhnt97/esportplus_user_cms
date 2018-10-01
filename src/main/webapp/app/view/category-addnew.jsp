<%-- 
    Document   : category-addnew
    Created on : Jan 11, 2018, 5:12:21 PM
    Author     : daua1993
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Add new category">
    <jsp:attribute name="content">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Add new category</h1>
            </div>
        </div>
        <form role="form">
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label>Category name</label>
                        <input class="form-control" placeholder="Category name" id="name">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label>Type of Page</label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="chk_home" value="1"/>
                            <label class="form-check-label" for="chk_home">Home</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="chk_video" value="2"/>
                            <label class="form-check-label" for="chk_video">Video</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="chk_gif" value="3"/>
                            <label class="form-check-label" for="chk_gif">GIF</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" checked id="chk_all" value="-1"/>
                            <label class="form-check-label" for="chk_all">All</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label>Display position</label>
                        <input class="form-control" placeholder="Position" id="position">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" rows="3" id="note" placeholder="Description"></textarea>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <button type="submit" class="btn btn-default" id="btnAdd">Add category</button>
                </div>
            </div>
        </form>
    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="${contextPath}/app/controller/category-addnew.js" type='text/javascript'></script>
    </jsp:attribute>
</mt:masterpage>
