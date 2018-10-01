package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "get-list-posts-manager", urlPatterns = {"/get-list-posts-manager"})
public class GetListPostsManagerRequest extends GetForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post-manager/get";
    }
}
