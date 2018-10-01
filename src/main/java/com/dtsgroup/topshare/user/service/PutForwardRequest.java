/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author daua1993
 */
public abstract class PutForwardRequest extends ForwardRequest {

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.processRequest(req, resp);
    }

    @Override
    public boolean storageAction() {
        return true;
    }

    @Override
    public JSONObject executeRequest(Map<String, String> params) {
        JSONObject json = putData(getRequestUrl(), params);
        return json;
    }

    private JSONObject putData(String query, Map<String, String> params) {
        JSONObject jo = new JSONObject();
        HttpURLConnection conn = null;
        try {

            String json = this.paramsJson.toJSONString();
            logger.info("url = " + query);
            logger.info("json = " + json);

            URL url = new URL(query);
            conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(5000);
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setRequestMethod("PUT");

            try (OutputStream os = conn.getOutputStream()) {
                os.write(json.getBytes("UTF-8"));
            }

            int responseCode = conn.getResponseCode();
            logger.info("Response Code : " + responseCode);

            String result;
            try (InputStream in = new BufferedInputStream(conn.getInputStream())) {
                result = org.apache.commons.io.IOUtils.toString(in, "UTF-8");
            }
            logger.info("result={}", result);

            jo = convertStringToJson(result);

        } catch (MalformedURLException ex) {
            logger.error("MalformedURLException: ", ex);
        } catch (IOException | ParseException ex) {
            logger.error("IOException | ParseException: ", ex);
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        return jo;
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
        paramsJson.put("creator", username);
        if (params == null) {
            params = new HashMap<>();
        }
        params.clear();
        return null;
    }
}
