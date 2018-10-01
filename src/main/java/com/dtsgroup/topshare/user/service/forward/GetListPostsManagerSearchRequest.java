package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "find-posts-manager", urlPatterns = {"/find-posts-manager"})
public class GetListPostsManagerSearchRequest extends GetForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post-manager/find";
    }
}
