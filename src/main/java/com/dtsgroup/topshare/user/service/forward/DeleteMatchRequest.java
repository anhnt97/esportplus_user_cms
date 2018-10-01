package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.DeleteForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "match-delete", urlPatterns = {"/match-delete"})
public class DeleteMatchRequest extends DeleteForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post-manager/remove-posts";
    }
}
