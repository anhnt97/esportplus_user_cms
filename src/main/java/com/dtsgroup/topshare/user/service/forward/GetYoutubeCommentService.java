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
@WebServlet(name = "video/comment", urlPatterns = {"/video/comment"})
public class GetYoutubeCommentService extends GetForwardRequest {

    @Override
    public String getRequestUrl() {
//        /video/comment?u=url[&n=nextPageToken]
        String url = baseYoutubeUrl();
        url += "/video/comment";
        return url;
    }

}
