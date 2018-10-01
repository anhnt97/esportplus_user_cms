package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;
import com.dtsgroup.topshare.user.service.PutForwardRequest;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "update-set", urlPatterns = {"/update-set"})
public class UpdateSetMatchRequest extends PostForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/set-match";
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
