package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "video/facebook", urlPatterns = {"/video/facebook"})
public class GetFacebookRequest extends GetForwardRequest {
    @Override
    public String getRequestUrl() {
        String url = baseYoutubeUrl();
        url += "/video/facebook";
        return url;
    }
}
