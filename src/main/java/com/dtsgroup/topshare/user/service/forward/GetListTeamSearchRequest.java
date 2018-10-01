package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "find-team-request", urlPatterns = {"/find-team-request"})
public class GetListTeamSearchRequest extends GetForwardRequest{
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/team/find";
    }
}
