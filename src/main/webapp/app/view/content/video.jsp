<%--
  Created by IntelliJ IDEA.
  User: daua1993
  Date: 01/02/2018
  Time: 15:04
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<mt:masterpage title="Add new video content">

    <jsp:attribute name="content">

        <div id="app">

            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Add new video content</h1>
                </div>
            </div>

            <div class="row" id="app-1">
                <form role="form">
                    <div class="col-lg-8">
                        <div class="form-group">
                            <input id="link_youtube" type="text" class="form-control" placeholder="Video url ...">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <button type="button" v-on:click.prevent="getInfoClick" class="btn btn-primary">Get info
                        </button>
                        <label>OR</label>
                        <button type="button" v-on:click.prevent="$refs.choose_video_file.click()"
                                class="btn btn-primary">Choose Video
                        </button>
                    </div>
                </form>
            </div>

            <div id="app-2" style="display: block;" v-bind:style="blockContent">
                <component :is="currentView"
                           v-bind:options="options"
                           v-bind:link="link"
                           v-bind:file="file"
                           v-bind:file_type="file_type"
                           v-on:content-created="onContentCreated($event)"></component>
            </div>
            

            <canvas style="display:none;" id="myCanvas1"></canvas>

            <input type="file" v-on:change="onVideoFileChange" style="display:none;" ref="choose_video_file"/>

        </div>
    </jsp:attribute>
    <jsp:attribute name="jslink">
        <script src="${contextPath}/js/utils.js" type="text/javascript"></script>
        <script src="${contextPath}/js/defineds.js" type="text/javascript"></script>
        <script src="${contextPath}/js/requestApi.js" type="text/javascript"></script>
        <script src="${contextPath}/js/moment.js" type="text/javascript"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

        <link href="${contextPath}/js/datetime/bootstrap-datetimepicker.css" rel="stylesheet" type="text/css"/>
        <script src="${contextPath}/js/datetime/moment-with-locales.js" type="text/javascript"></script>
        <script src="${contextPath}/js/datetime/bootstrap-datetimepicker.js" type="text/javascript"></script>

        <link href="${contextPath}/css/cropper.css" rel="stylesheet">
        <script src="${contextPath}/js/cropper.js"></script>

        <script src="${contextPath}/js/jquery.matchHeight-min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/select2.full.min.js" type="text/javascript"></script>
        <script src="${contextPath}/js/vue.js" type="text/javascript"></script>
        <script src="${contextPath}/js/hls.js" type="text/javascript"></script>
        <script src="${contextPath}/js/html2canvas.min.js" type="text/javascript"></script>

        <script src="${contextPath}/js/bootstrap-multiselect.js" type="text/javascript"></script>
        <link href="${contextPath}/css/bootstrap-multiselect.css" rel="stylesheet" type="text/css"/>

        <script src="${contextPath}/app/vue/thumb-item.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/comment-item.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/video-component.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/tree-set-component.js" type="text/javascript"></script>

        <script src="${contextPath}/app/vue/blank-upload-component.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/facebook-component.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/youtube-component.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/upload-component.js" type="text/javascript"></script>
        <script src="${contextPath}/app/vue/upload-non-mp4-component.js" type="text/javascript"></script>
        
        <script src="${contextPath}/app/vue/trim_video_component.js" type="text/javascript"></script>
        
        <script src="${contextPath}/app/controller/content/video.js" type="text/javascript"></script>

        
        <script type="text/javascript">

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            window.fbAsyncInit = function () {
                FB.init({
                    appId: '143181866391713',
                    cookie: true,
                    xfbml: true,
                    version: 'v2.8'
                });
            };

            function facebookLogin(fnCallBack) {
                FB.login((response) => {
                    console.log("herere facebookLogin");
                    if (response.status === 'connected') {
                        console.log("Facebook login connected: start login");
                        console.log(response);
                        getUserInfo(response.authResponse.accessToken, fnCallBack);
                    }
                }, {scope: 'public_profile,email,manage_pages,pages_show_list'});
            }

            function getUserInfo(accessToken, fnCallBack) {
                FB.api('/me', {fields: "id,name,picture,accounts{access_token,name,cover}"}, (response) => {
                    fnCallBack(response);
                });
            }

            function getVideocomment(response) {

                var acc = response.accounts.data[0];
                console.log("data= " + JSON.stringify(acc));

            }

        </script>

    </jsp:attribute>
</mt:masterpage>


