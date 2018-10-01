/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author daua1993
 */
public abstract class PostBaseRequest extends BaseRequest {

    @Override
    public boolean storageAction() {
        return true;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.processRequest(req, resp);
    }

    @Override
    protected Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException {
        Map<String, String> p = new HashMap<>();
        if (request != null) {
            Enumeration<String> parameterNames = request.getParameterNames();
            if (parameterNames != null) {
                while (parameterNames.hasMoreElements()) {
                    String paramName = parameterNames.nextElement();
                    p.put(paramName, request.getParameter(paramName));
                }
            }
        }
        return p;
    }
}
