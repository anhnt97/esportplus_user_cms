/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service;

import com.dtsgroup.topshare.user.utils.HttpUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * @author daua1993
 */
public abstract class PostForwardRequest extends ForwardRequest {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.processRequest(req, resp);
    }

    @Override
    public boolean storageAction() {
        return true;
    }

    @Override
    public JSONObject executeRequest(Map<String, String> params) {
        JSONObject json = HttpUtils.postData(getRequestUrl(), paramsJson);
        logger.info("PostForwardRequest: "+JSONObject.toJSONString(paramsJson));
        return json;
    }

    @Override
    protected Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException {
        BufferedReader br = null;
        try {
            String json;
            try (InputStream in = new BufferedInputStream(request.getInputStream())) {
                json = org.apache.commons.io.IOUtils.toString(in, "UTF-8");
            }
            logger.info("json = " + json);
            paramsJson = convertStringToJson(json);
        } catch (IOException | ParseException ex) {
            logger.error("", ex);
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException ex) {
                logger.error("", ex);
            }
        }
        if (paramsJson == null) {
            paramsJson = new JSONObject();
        }
        paramsJson.put("create_by", username);
        paramsJson.put("acc_id", username);
        if (params == null) {
            params = new HashMap<>();
        }
        params.clear();
        return null;
    }

}
