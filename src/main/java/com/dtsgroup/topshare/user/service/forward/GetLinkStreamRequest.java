package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;
/**
 *
 * @author MinhDV < john at dtsgroup.com >
 */
@WebServlet(name="getlinkstream",urlPatterns = {"/getlinkstream"})
public class GetLinkStreamRequest extends PostForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrlApp();
    }
}
