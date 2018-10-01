package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.DeleteForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "bet-match-delete", urlPatterns = {"/bet-match-delete"})
public class DeleteBetMatchRequest extends DeleteForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/bet-match";
    }
}
