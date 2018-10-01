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
@WebServlet(name = "video/comment/replies", urlPatterns = {"/video/comment/replies"})
public class GetYouTubeCommentRepliesService extends GetForwardRequest {

    @Override
    public String getRequestUrl() {
        ///video/comment/:commentId/replies[?n=nextPageToken]
        String commentId = params.get("commentId");
        String nextPageToken = null;
        if (params.containsKey("nextPageToken")) {
            nextPageToken = params.get("nextPageToken");
        }
        String url = baseYoutubeUrl();
        url += "/video/comment/" + commentId + "/replies";
        if (nextPageToken != null) {
            url += "[?n=" + nextPageToken + "]";
        }
        params.clear();
        return url;
    }

}
