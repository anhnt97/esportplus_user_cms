package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "get-list-team", urlPatterns = {"/get-list-team"})
public class GetListTeamRequest extends GetForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/team/get";
    }
}
