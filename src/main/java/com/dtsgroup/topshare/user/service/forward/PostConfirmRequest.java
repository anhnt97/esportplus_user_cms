package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "post-confirm", urlPatterns = {"/post-confirm"})
public class PostConfirmRequest extends PostForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post/confirm";
    }

    @Override
    protected String getNoteAction() {
        return username + " confirm post ";
    }
}
