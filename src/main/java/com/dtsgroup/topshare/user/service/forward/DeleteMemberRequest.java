package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.DeleteForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "member-delete", urlPatterns = {"/member-delete"})
public class DeleteMemberRequest extends DeleteForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/members";
    }
}
