package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.DeleteForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "posts-manager-delete", urlPatterns = {"/posts-manager-delete"})
public class DeletePostsManagerRequest extends DeleteForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post-manager";
    }
}
