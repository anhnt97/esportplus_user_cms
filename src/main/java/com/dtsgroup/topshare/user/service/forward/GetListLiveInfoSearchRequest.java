package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "find-live-info", urlPatterns = {"/find-live-info"})
public class GetListLiveInfoSearchRequest extends GetForwardRequest{
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post/find-live-info";
    }
}
