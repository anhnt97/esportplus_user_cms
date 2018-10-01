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
 * @author daua1993
 */
@WebServlet(name = "unlock-bet-match", urlPatterns = {"/unlock-bet-match"})
public class UnLockBetMatchRequest extends PostForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/bet-match/unlockbet";
    }

    @Override
    protected String getNoteAction() {
        return "Admin " + username + " Khoa ban";
    }

    @Override
    protected Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException {
        super.getParams(request);
        paramsJson.put("creator", username);
        return null;
    }

    @Override
    protected Map<String, String> fieldsUnsave() {
        Map<String, String> fields = new HashMap<>();
        fields.put("thumbs", "too long");
        return fields;
    }
}
