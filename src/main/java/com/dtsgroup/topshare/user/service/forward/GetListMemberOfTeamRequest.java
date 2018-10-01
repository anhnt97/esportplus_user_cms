package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "get-list-member", urlPatterns = {"/get-list-member"})
public class GetListMemberOfTeamRequest extends GetForwardRequest{
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/members/findbyteam";
    }
}
