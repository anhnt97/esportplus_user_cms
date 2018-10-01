package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "content-post", urlPatterns = {"/content-post"})
public class GetContentPostRequest extends GetForwardRequest {
    @Override
    public String getRequestUrl() {
        String id = "";
        if (params != null && params.containsKey("id")) {
            id = params.get("id");
        }
        return baseUrl() + "/post/" + id;
    }
}
