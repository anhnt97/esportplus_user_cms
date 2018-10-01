package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.DeleteForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "comment-delete", urlPatterns = {"/comment-delete"})
public class DeleteCommentRequest extends DeleteForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/comment";
    }
}
