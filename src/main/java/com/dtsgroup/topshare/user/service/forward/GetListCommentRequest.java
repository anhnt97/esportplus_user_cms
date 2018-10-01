package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "comment-list", urlPatterns = {"/comment-list"})
public class GetListCommentRequest extends GetForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/comment";
    }
}
