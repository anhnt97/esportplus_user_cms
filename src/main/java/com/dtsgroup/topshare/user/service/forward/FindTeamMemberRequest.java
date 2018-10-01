package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "find-team-mem", urlPatterns = {"/find-team-mem"})
public class FindTeamMemberRequest extends GetForwardRequest{
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/members/find_by_ids";
    }
}
