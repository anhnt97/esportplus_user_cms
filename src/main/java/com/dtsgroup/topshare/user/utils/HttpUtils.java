/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.utils;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.Map;

/**
 * @author daua1993
 */
public class HttpUtils {

    private static final Logger logger = LoggerFactory.getLogger(HttpUtils.class);

    private static CloseableHttpClient httpClient;

    public static JSONObject post(String url, JSONObject params, Map<String, String> headers) throws IOException, ParseException {
        JSONObject response = new JSONObject();
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        StringEntity entity = new StringEntity(params.toJSONString());
        httpPost.setEntity(entity);
        for (Map.Entry<String, String> entry : headers.entrySet()) {
            httpPost.setHeader(entry.getKey(), entry.getValue());
        }
        CloseableHttpResponse resp = client.execute(httpPost);
        String json = EntityUtils.toString(resp.getEntity());
        response = convertStringToJson(json);
        client.close();
        return response;
    }

    public static JSONObject postData(String query, JSONObject jsonObject) {
        return httpExecute(query, jsonObject, "POST");
    }

    public static JSONObject putData(String query, JSONObject jsonObject) {
        return httpExecute(query, jsonObject, "PUT");
    }

    public static JSONObject deleteData(String query, JSONObject jsonObject) {
        return httpExecute(query, jsonObject, "DELETE");
    }

    public static JSONObject getData(String url, Map<String, String> params) {
        JSONObject jo = new JSONObject();
        HttpURLConnection conn = null;
        try {
            url = url + "?" + getParamsString(params);
            URL uri = new URL(url);
            conn = (HttpURLConnection) uri.openConnection();
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestMethod("GET");
            conn.setDoOutput(true);

            int responseCode = conn.getResponseCode();
            logger.info("http get response code : " + responseCode);

            String inputLine;
            StringBuilder content = new StringBuilder();
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();

            jo = convertStringToJson(content.toString());

        } catch (Exception ex) {
            logger.error("", ex);
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        return jo;
    }

    private static JSONObject httpExecute(String query, JSONObject jsonObject, String method) {
        JSONObject jo = new JSONObject();
        HttpURLConnection conn = null;
        try {

            String json = jsonObject.toJSONString();
            logger.info("url = " + query);
            logger.info("jsonRequest = " + json);

            URL url = new URL(query);
            conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(5000);
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setRequestMethod(method);

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

    public static JSONObject upload(String url, Map<String, String> files, Map<String, String> params) {
        logger.info("upload url={}", url);
        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
        Charset chars = Charset.forName("UTF-8");
        params.entrySet().forEach((entry) -> {
            String key = entry.getKey();
            String value = entry.getValue();
            StringBody body = null;
            try {
                body = new StringBody(value, chars);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if (body != null) {
                builder.addPart(key, body);
            }
            logger.info("file key={} | path={}", key, value);
        });
        files.entrySet().forEach((entry) -> {
            String key = entry.getKey();
            String value = entry.getValue();
            FileBody bin = new FileBody(new File(value));
            builder.addPart(key, bin);
            logger.info("param key={} | path={}", key, value);
        });
        return upload(url, builder);
    }

    public static JSONObject upload(String url, String filePath, Map<String, String> params) {
        logger.info("upload url={}, file={}", url, filePath);
        FileBody bin = new FileBody(new File(filePath));
        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
        params.entrySet().forEach((entry) -> {
            String key = entry.getKey();
            String value = entry.getValue();
            StringBody body = new StringBody(value, ContentType.TEXT_PLAIN);
            builder.addPart(key, body);
            logger.info("param key={} | path={}", key, value);
        });
        builder.addPart("file", bin);
        return upload(url, builder);
    }

    public static JSONObject upload(String url, MultipartEntityBuilder multipartEntityBuilder) {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        JSONObject o = null;
        try {
            HttpPost httppost = new HttpPost(url);
            HttpEntity entity = multipartEntityBuilder.build();

            httppost.setEntity(entity);
            logger.info("executing request {}", httppost.getRequestLine());
            try (CloseableHttpResponse response = httpclient.execute(httppost)) {
                logger.info("{}", response.getStatusLine());
                String json = EntityUtils.toString(response.getEntity());
                o = convertStringToJson(json);
            } catch (ParseException ex) {
                logger.error("ParseException: ", ex);
            }
        } catch (IOException ex) {
            logger.error("IOException: ", ex);
        } finally {
            if (httpclient != null) {
                try {
                    httpclient.close();
                } catch (IOException ex) {
                    logger.error("IOException: ", ex);
                }
            }
        }
        return o;
    }

    public static JSONObject convertStringToJson(String jsonString) throws ParseException {
        if (jsonString == null || "".equals(jsonString)) {
            return null;
        }
        JSONObject jo = (JSONObject) new JSONParser().parse(jsonString);
        return jo;
    }

    private static String getParamsString(Map<String, String> params) throws UnsupportedEncodingException {
        StringBuilder result = new StringBuilder();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
            result.append("=");
            result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
            result.append("&");
        }
        String resultString = result.toString();
        return resultString.length() > 0
                ? resultString.substring(0, resultString.length() - 1)
                : resultString;
    }
}
