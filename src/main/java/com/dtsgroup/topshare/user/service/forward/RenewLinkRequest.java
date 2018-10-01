package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "renew-link", urlPatterns = {"/renew-link"})
public class RenewLinkRequest extends PostForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post/renew";
    }
}
