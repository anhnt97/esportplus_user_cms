package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "add-member-request", urlPatterns = {"/add-member-request"})
public class PostAddMemberRequest extends PostForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/members/create";
    }
}
