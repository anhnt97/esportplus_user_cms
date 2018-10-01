/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service;

import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author daua1993
 */
public abstract class GetForwardRequest extends ForwardRequest {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.processRequest(req, resp);
    }

    @Override
    public boolean storageAction() {
        return false;
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

    @Override
    public JSONObject executeRequest(Map<String, String> params) {
        JSONObject json = getData(getRequestUrl(), params);
        return json;
    }

    protected JSONObject getData(String url, Map<String, String> params) {
        JSONObject jo = new JSONObject();
        HttpURLConnection conn = null;
        try {

            StringBuilder bl = new StringBuilder();
            bl.append(url).append("?");
            int index = 0;
            for (Map.Entry<String, String> entry : params.entrySet()) {
                if (index > 0) {
                    bl.append("&");
                }
                bl.append(entry.getKey()).append("=").append(URLEncoder.encode(entry.getValue(), "UTF-8"));
                index++;
            }

            logger.info("url = " + bl.toString());
            URL obj = new URL(bl.toString());

            conn = (HttpURLConnection) obj.openConnection();
            conn.setRequestMethod("GET");
            int responseCode = conn.getResponseCode();

            logger.info("Response Code : " + responseCode);

            StringBuilder response;
            try (BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
                String inputLine;
                response = new StringBuilder();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
            }
            logger.info("result={}", response);
            jo = convertStringToJson(response.toString());

        } catch (MalformedURLException ex) {
            logger.error("MalformedURLException: ", ex);
        } catch (IOException | org.json.simple.parser.ParseException ex) {
            logger.error("IOException | ParseException: ", ex);
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        return jo;
    }

}
