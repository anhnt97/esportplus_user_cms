package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "find-bet-match", urlPatterns = {"/find-bet-match"})
public class FindBetMatchRequest extends GetForwardRequest{
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/bet-match/find";
    }
}
