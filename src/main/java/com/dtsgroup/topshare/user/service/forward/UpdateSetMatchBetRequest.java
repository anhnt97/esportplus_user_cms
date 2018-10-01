package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "update-set-betmatch", urlPatterns = {"/update-set-betmatch"})
public class UpdateSetMatchBetRequest extends PostForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/bet-match/update-setmatch";
    }
    @Override
    protected String getNoteAction() {
        return "Admin " + username + " cập nhât 1 bài viết";
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
