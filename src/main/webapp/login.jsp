<%@page import="com.dtsgroup.topshare.user.common.Permission" %>
<%@page import="com.dtsgroup.topshare.user.utils.AppUtils" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>


<%
    session.setAttribute("username", null);
    session.setAttribute("loggedIn", false);
    session.setAttribute("role", 2);
    session.setAttribute("displayName", null);
    session.setAttribute("list_role", null);
    Permission.getInstance().removeListRole();

    if (AppUtils.checkIp(request)) {
%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Login</title>
    <link rel="shortcut icon" href="${contextPath}/favicon.ico">
    <link href="${contextPath}/css/loaders.min.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/sb-admin-2.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/bootstrap-dialog.min.css" rel="stylesheet" type="text/css"/>
    <link href="${contextPath}/css/bootstrap-social.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="login-panel panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Login for creator</h3>
                </div>
                <div class="panel-body">
                    <form role="form" method="post" id="loginform">
                        <fieldset>
                            <div class="form-group">
                                <input class="form-control" id="username" placeholder="Username" name="username"
                                       autofocus>
                            </div>
                            <div class="form-group">
                                <input class="form-control" id="password" placeholder="Password" name="password"
                                       type="password" value="">
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btn btn-lg btn-success btn-block" id="btnLogin"
                                       value="Sign in"/>
                            </div>
                            <%--<div style="text-align: center;">--%>
                                <%--<label>OR</label>--%>
                            <%--</div>--%>
                            <%--<div>--%>

                                <%--<button type="button" onclick="facebookLogin()"--%>
                                        <%--class="btn btn-block btn-social btn-facebook">--%>
                                    <%--<i class="fa fa-facebook"></i> Sign in with Facebook--%>
                                <%--</button>--%>

                                <%--<button type="button" onclick="googleLogin()"--%>
                                        <%--class="btn btn-block btn-social btn-google-plus">--%>
                                    <%--<i class="fa fa-google-plus"></i> Sign in with Google--%>
                                <%--</button>--%>

                            <%--</div>--%>

                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" tabindex="-1" role="dialog" id="mdLoading" data-backdrop="static">
    <div class="modal-dialog modal-sm">
        <div data-loader="circle" style="margin: 1em auto"></div>
    </div>
</div>
<script src="${contextPath}/js/mlogger.js" type="text/javascript"></script>
<script src="${contextPath}/js/jquery.js" type="text/javascript"></script>
<script src="${contextPath}/js/bootstrap.min.js" type="text/javascript"></script>
<script src="${contextPath}/js/bootstrap-dialog.min.js" type="text/javascript"></script>
<script src="${contextPath}/js/utils.js" type="text/javascript"></script>
<script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
<script src="${contextPath}/js/axios.min.js" type="text/javascript"></script>
<script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
<script src="${contextPath}/js/md5.js" type="text/javascript"></script>
<script src="${contextPath}/js/plugins/bootstrapValidator.js" type="text/javascript"></script>
<script src="${contextPath}/js/execute/login.js" type="text/javascript"></script>
<script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>

<script>

    window.fbAsyncInit = function () {
        FB.init({
            appId: '909506062575324',
            cookie: true,
            xfbml: true,
            version: 'v2.8'
        });
    };

    function facebookLogin() {
        FB.login((response) => {
            if (response.status === 'connected') {
                console.log("Facebook login connected: start login");
                console.log(response);
                getUserInfo(response.authResponse.accessToken);
            }
        }, {scope: 'public_profile,email,manage_pages,pages_show_list'});
    }

    function getUserInfo(accessToken) {
        showLoading(true);
        FB.api('/me', {fields: "id,name,picture,accounts{access_token,name,cover}"}, (response) => {
            console.log(response);
            hideAllModal();
            const fbresp = parseDataFbLogin(response);
            console.log("id = " + fbresp.id);
            console.log("name = " + fbresp.name);
            console.log("img = " + fbresp.img);
            loginSocial({loginType: 1, userId: fbresp.id, name: fbresp.name, picture: fbresp.img, token: accessToken});
        });
    }


    function getVideocomment(response) {
    }

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function init() {
        gapi.load('auth2', function () {
            console.log("init google");
            gapi.auth2.init({
                client_id: '527124071539-n4nas6g09iifqqj4j3gpr4v6tv7nfruc.apps.googleusercontent.com',
                scope: 'profile email'
            }).then(function () {
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            });
        });
    }

    function updateSigninStatus(isSignedIn) {
        console.log("isSignedIn: " + isSignedIn);
        if (isSignedIn) {
        }
    }

    function googleLogin(event) {
        gapi.auth2.getAuthInstance().signIn().then(immediateSignInCallback, immediateSignInError);
    }

    function immediateSignInCallback(data) {
        const id = data.El;
        var w3 = data.w3;
        var Zi = data.Zi;
        var token = Zi.access_token;
        var name = w3.ig;
        var picture = w3.Paa;
        console.log("id = " + id);
        console.log("ig = " + name);
        console.log("picture = " + picture);
        console.log("token = " + token);
        loginSocial({loginType: 2, userId: id, name: name, picture: picture, token: token});
    }

    function immediateSignInError(err) {
        console.log(err)
    }

</script>

<script type="text/javascript">
    //https://api.twitter.com/oauth/request_token
    const tw = new Request();
    tw.postHide("https://api.twitter.com/oauth/request_token", {}, (data) => {
    });

       // axios.post('url', data, {
       //     headers: {
       //         'Content-Type': 'application/json',
       //     }
       // });
       //
       // axios.post(
       //     "https://api.twitter.com/oauth/request_token",
       //     {},
       //     {
       //         headers: {
       //             "oauth_callback": "https://creator.topshare.live/twitter_auth_callback.jsp"
       //         }
       //     }).then((response) => {
       //     console.log(response);
       // }).catch((error) => {
       //     console.log(error);
       // });

</script>

</body>
</html>
<% } else {
    response.getWriter().println("Invalid Page !");
    response.getWriter().flush();
}
%>
