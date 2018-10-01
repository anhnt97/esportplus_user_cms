package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PutForwardRequest;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@WebServlet(name = "update-bet-match", urlPatterns = {"/update-bet-match"})
public class UpdateBetMatchRequest extends PutForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/bet-match/update";
    }
    @Override
    protected Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException {
        super.getParams(request);
        paramsJson.put("creator", username);
        return null;
    }
}
