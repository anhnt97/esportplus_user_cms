/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service;

import com.dtsgroup.topshare.user.common.AppConfig;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author daua1993
 */
public abstract class ForwardRequest extends BaseRequest {

    public abstract String getRequestUrl();

    protected String baseUrl() {
        String url = AppConfig.getConfig().getProperty("API_URL", "http://45.124.95.231:9981/api", "URL");
        return url;
    }

    protected String baseYoutubeUrl() {
        String url = AppConfig.getConfig().getProperty("YOUTUBE", "http://203.162.166.162:3000/api", "URL");
        return url;
    }

    protected String baseUrlApp(){
        String url = "https://api.topshare.live/getlinkstream";
        return url;
    }

    protected JSONObject convertStringToJson(String jsonString) throws ParseException {
        if (jsonString == null || "".equals(jsonString)) {
            return null;
        }
        JSONObject jo = (JSONObject) new JSONParser().parse(jsonString);
        return jo;
    }

}
