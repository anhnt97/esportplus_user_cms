<%@tag import="com.dtsgroup.topshare.user.common.AppLogger" %>
<%@tag import="com.dtsgroup.topshare.user.common.Permission" %>
<%@tag import="com.dtsgroup.topshare.user.utils.AppUtils" %>
<%
    Integer role = null;
    if (session.getAttribute("role") != null) {
        role = (Integer) session.getAttribute("role");
    }

    String list_role = "";
    if (session.getAttribute("list_role") != null) {
        list_role = AppUtils.parseString(session.getAttribute("list_role"));
    }
    Permission.getInstance().setListRole(list_role);

    String adminName = null;
    if (session.getAttribute("displayName") != null) {
        adminName = (String) session.getAttribute("displayName");
    } else {
        adminName = "User Profile";
    }

    if (session.getAttribute("loggedIn") != null) {
        Boolean t = (Boolean) session.getAttribute("loggedIn");
        if (t == null || !t) {
            response.sendRedirect("login.jsp");
        } else {
            StringBuffer fullUrl = request.getRequestURL();
            String url = AppUtils.getServiceFromURI(fullUrl.toString());
            boolean ck1 = Permission.getInstance().checkPermission(url, role);
            if (!ck1) {
                AppLogger.getLogger().info("user can not access with role {} and link {}", role, url);
                Permission.getInstance().printRole(adminName);
            }
            boolean ck2 = AppUtils.checkIp(request);
            if (ck1 && ck2) {
%>
<%@tag description="put the tag description here" pageEncoding="UTF-8" %>
<%@attribute name="title" required="true" rtexprvalue="true" %>
<%@attribute name="content" fragment="true" %>
<%@attribute name="jslink" fragment="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${title}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="">
    <link rel="shortcut icon" href="${contextPath}/favicon.ico">
    <link href="${contextPath}/css/loaders.min.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/plugins/metisMenu/metisMenu.min.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/plugins/dataTables.bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/sb-admin-2.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/plugins/bootstrapValidator.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/bootstrap-dialog.min.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/custom.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/bootstrap-tagsinput.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/select2.min.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/jquery-ui.css" rel="stylesheet" type="text/css"/>

</head>

<body>
<div id="wrapper">
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="${contextPath}/dashboard">Esport - Creator</a>
        </div>
        <ul class="nav navbar-top-links navbar-right">
            <li><p>Hi, <%=adminName%>
            </p></li>
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu dropdown-user">
                    <li><a href="${contextPath}/profile"><i class="fa fa-user fa-fw"></i> Profile
                    </a>
                    </li>
                    <li><a href="${contextPath}/changepassword"><i class="fa fa-gear fa-fw"></i> Change password</a>
                    </li>
                    <li class="divider"></li>
                    <li><a href="login.jsp"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                    </li>
                </ul>
            </li>
        </ul>

        <!--MENU VERTICAL ======================-->
        <div class="navbar-default sidebar" role="navigation">
            <div class="sidebar-nav navbar-collapse">
                <ul class="nav metismenu" id="side-menu">

                    <% if (Permission.getInstance().checkPermission("dashboard", role)) {%>
                    <li>
                        <a href="${contextPath}/dashboard"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
                    </li>
                    <% }%>

                    <% if (Permission.getInstance().checkPermission("content-manager", role)) {%>
                    <li>
                        <a href="${contextPath}/content-manager"><i class="fa fa-list fa-fw"></i> Contents
                            management</a>
                    </li>
                    <% }%>
                    <% if (Permission.getInstance().checkPermission("news-manager", role)) {%>
                    <li>
                        <a href="${contextPath}/news-manager"><i class="fa fa-list fa-fw"></i> News
                            management</a>
                    </li>

                    <% }%>
                    <% if (Permission.getInstance().checkPermission("content-manager", role)) {%>
                    <li>
                        <a href="${contextPath}/team-member-manager"><i class="fa fa-users fa-fw"></i>Team Management</a>
                    </li>
                    <% }%>

                    <% if (Permission.getInstance().checkPermission("content-manager", role)) {%>
                    <li>
                        <a href="${contextPath}/betmatch-management"><i class="fa fa-users fa-fw"></i>Bet Match Management</a>
                    </li>
                    <% }%>

                    <% if (Permission.getInstance().checkPermission("content-manager", role)) {%>
                    <li>
                        <a href="${contextPath}/posts-management"><i class="fa fa-users fa-fw"></i>Post Series Management</a>
                    </li>
                    <% }%>

                    <%--<% if (Permission.getInstance().checkPermission("content-manager", role)) {%>--%>
                    <%--<li>--%>
                        <%--<a href="${contextPath}/upload-posts-manager"><i class="fa fa-file-text fa-fw"></i>Add New Post Series</a>--%>
                    <%--</li>--%>
                    <%--<% }%>--%>

                    <%--<% if (Permission.getInstance().checkPermission("video", role)) {%>--%>
                    <%--<li>--%>
                        <%--<a href="${contextPath}/livestreaming"><i class="fa fa-file-movie-o fa-fw"></i>Upload Live Streaming</a>--%>
                    <%--</li>--%>
                    <%--<% }%>--%>

                    <% if (Permission.getInstance().checkPermission("video", role)) {%>
                    <li>
                        <a href="${contextPath}/video"><i class="fa fa-file-movie-o fa-fw"></i>Upload Video</a>
                    </li>
                    <% }%>

                    <% if (Permission.getInstance().checkPermission("upload-news", role)) {%>
                    <li>
                        <a href="${contextPath}/upload-news"><i class="fa fa-file-text fa-fw"></i>Upload News</a>
                    </li>
                    <% }%>

                    <%--<% if (Permission.getInstance().checkPermission("upload-gif", role)) {%>--%>
                    <%--<li>--%>
                        <%--<a href="${contextPath}/upload-gif"><i class="fa fa-file-photo-o fa-fw"></i>Upload GIF</a>--%>
                    <%--</li>--%>
                    <%--<% }%>--%>

                    <% if (Permission.getInstance().checkPermission("list-pending", role)) {%>
                    <li>
                        <a href="${contextPath}/list-pending"><i class="fa fa-bookmark-o fa-fw"></i>Pending Upload</a>
                    </li>
                    <% }%>

                </ul>
            </div>
        </div>
    </nav>

    <div id="page-wrapper">
        <jsp:invoke fragment="content"/>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="mdLoading" data-backdrop="static">
        <div class="modal-dialog modal-sm">
            <div data-loader="circle" style="margin: 1em auto"></div>
        </div>
    </div>

</div>
<script src="${contextPath}/js/mlogger.js" type="text/javascript"></script>
<script src="${contextPath}/js/jquery.js" type="text/javascript"></script>
<script src="${contextPath}/js/bootstrap.min.js" type="text/javascript"></script>
<script src="${contextPath}/js/plugins/metisMenu/metisMenu.min.js" type="text/javascript"></script>
<script src="${contextPath}/js/plugins/dataTables/jquery.dataTables.js" type="text/javascript"></script>
<script src="${contextPath}/js/plugins/dataTables/dataTables.bootstrap.js" type="text/javascript"></script>
<%--<script src="${contextPath}/js/sb-admin-2.js" type="text/javascript"></script>--%>
<script src="${contextPath}/js/bootstrap-dialog.min.js" type="text/javascript"></script>
<script src="${contextPath}/js/plugins/dataTables/sorttime1.js" type="text/javascript"></script>
<script src="${contextPath}/js/plugins/bootstrapValidator.js" type="text/javascript"></script>
<script src="${contextPath}/js/axios.min.js" type="text/javascript"></script>
<script src="${contextPath}/js/bootstrap-tagsinput.min.js" type="text/javascript"></script>
<jsp:invoke fragment="jslink"/>
</body>
</html>
<% } else {
    response.getWriter().println("Invalid Page !");
    response.getWriter().flush();
}
}
} else {
    response.sendRedirect("login.jsp");
}
%>