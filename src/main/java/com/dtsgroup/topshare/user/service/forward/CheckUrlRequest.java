package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "check-url", urlPatterns = {"/check-url"})
public class CheckUrlRequest extends GetForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post/check-url";
    }

}
