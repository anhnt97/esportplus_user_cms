package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "get-posts-manager-info", urlPatterns = {"/get-posts-manager-info"})
public class GetPostsManagerRequest extends GetForwardRequest{
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post-manager/info";
    }
}
