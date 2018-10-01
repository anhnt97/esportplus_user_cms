package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@WebServlet(name = "get-pending-one", urlPatterns = {"/get-pending-one"})
public class GetOneUploadPendingRequest extends GetForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/upload/pending/one";
    }

    @Override
    protected Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException {
        Map<String, String> m = super.getParams(request);
        m.put("uid", username);
        return m;
    }
}
