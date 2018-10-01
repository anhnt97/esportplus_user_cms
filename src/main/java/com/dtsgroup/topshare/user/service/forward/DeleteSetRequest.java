package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.DeleteForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "set-delete", urlPatterns = {"/set-delete"})
public class DeleteSetRequest extends DeleteForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post-manager/remove-sets";
    }
}
