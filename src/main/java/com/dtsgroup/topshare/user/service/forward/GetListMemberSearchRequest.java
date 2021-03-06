package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "find-member", urlPatterns = {"/find-member"})
public class GetListMemberSearchRequest extends GetForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/members/find";
    }
}
