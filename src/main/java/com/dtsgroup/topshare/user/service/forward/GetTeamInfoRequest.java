package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "get-team-info", urlPatterns = {"/get-team-info"})
public class GetTeamInfoRequest extends GetForwardRequest {
    @Override
    public String getRequestUrl() {
        String id = "";
        if (params != null && params.containsKey("id")) {
            id = params.get("id");
        }
        return baseUrl() + "/team/" + id;
    }
}
