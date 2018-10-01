package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "add-team-request", urlPatterns = {"/add-team-request"})
public class PostAddTeamRequest  extends PostForwardRequest{
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/team/create";
    }
}
