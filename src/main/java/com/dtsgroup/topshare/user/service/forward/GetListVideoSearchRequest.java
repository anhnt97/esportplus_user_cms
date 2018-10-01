package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "find-post", urlPatterns = {"/find-post"})
public class GetListVideoSearchRequest extends GetForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post/findpost";
    }
}
