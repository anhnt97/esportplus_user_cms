package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.DeleteForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "post-delete", urlPatterns = {"/post-delete"})
public class DeletePostRequest extends DeleteForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post";
    }
}
