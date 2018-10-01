package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@WebServlet(name = "upload-news-service", urlPatterns = {"/upload-news-service"})
public class PostNewsRequest extends PostForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post/news/create";
    }
    @Override
    protected Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException {
       super.getParams(request);
        paramsJson.put("creator", username);
        return null;
    }
}
