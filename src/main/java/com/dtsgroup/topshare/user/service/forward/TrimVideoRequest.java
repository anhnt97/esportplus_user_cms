/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author MinhDV < john at dtsgroup.com >
 */
@WebServlet(name="trim-video",urlPatterns = {"/trim-video"})
public class TrimVideoRequest extends PostForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post_video_trim/create_trim_video";
    }

    @Override
    protected String getNoteAction() {
        return "Admin " + username + " cat 1 video";
    }

    @Override
    protected Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException {
        super.getParams(request);
        return null;
    }

    @Override
    protected Map<String, String> fieldsUnsave() {
        Map<String, String> fields = new HashMap<>();
        return fields;
    }
    
}
