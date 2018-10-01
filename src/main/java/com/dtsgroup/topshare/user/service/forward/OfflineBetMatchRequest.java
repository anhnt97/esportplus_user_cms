package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "bet-match-turnoff", urlPatterns = {"/bet-match-turnoff"})
public class OfflineBetMatchRequest extends PostForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/bet-match/turnoff";
    }

    @Override
    protected String getNoteAction() {
        return username + " confirm post ";
    }
}
