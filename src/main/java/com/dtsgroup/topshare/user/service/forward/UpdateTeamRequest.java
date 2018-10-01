package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PutForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "update-team", urlPatterns = {"/update-team"})
public class UpdateTeamRequest extends PutForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/team";
    }
}
