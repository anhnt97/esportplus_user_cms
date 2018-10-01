package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "get-bet-match-info", urlPatterns = {"/get-bet-match-info"})
public class GetBetMatchRequest extends GetForwardRequest{
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/bet-match/info";
    }
}
