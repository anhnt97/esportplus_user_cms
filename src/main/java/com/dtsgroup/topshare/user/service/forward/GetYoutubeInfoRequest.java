/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

/**
 *
 * @author daua1993
 */
@WebServlet(name = "video/basic-info", urlPatterns = {"/video/basic-info"})
public class GetYoutubeInfoRequest extends GetForwardRequest {

    @Override
    public String getRequestUrl() {
        String url = baseYoutubeUrl();
        url += "/video/basic-info";
        return url;
    }

}
