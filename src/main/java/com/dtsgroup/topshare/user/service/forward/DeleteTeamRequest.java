package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.DeleteForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "team-delete", urlPatterns = {"/team-delete"})
public class DeleteTeamRequest extends DeleteForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/team";
    }
}
