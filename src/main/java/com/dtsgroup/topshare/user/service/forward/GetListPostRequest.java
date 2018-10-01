/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Map;

/**
 *
 * @author daua1993
 */
@WebServlet(name = "content-get", urlPatterns = {"/content-get"})
public class GetListPostRequest extends GetForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post";
    }
    @Override
    protected Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException {
        Map<String, String> map = super.getParams(request);
        map.put("uid", username);
        return map;
    }
}
