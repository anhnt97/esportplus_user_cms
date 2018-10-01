package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PutForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "comment-update", urlPatterns = {"/comment-update"})
public class UpdateCommentRequest extends PutForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/comment";
    }
}
