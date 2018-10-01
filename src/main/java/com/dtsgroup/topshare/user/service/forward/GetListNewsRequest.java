package com.dtsgroup.topshare.user.service.forward;


import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@WebServlet(name = "get-list-news", urlPatterns = {"/get-list-news"})
public class GetListNewsRequest extends GetForwardRequest{

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post/get-news";
    }
    @Override
    protected Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException {
        Map<String, String> m = super.getParams(request);
        m.put("acc_id", username);
//        m.put("acc_id", "5b4724d2351c0909f8292175");
        return m;
    }
}
