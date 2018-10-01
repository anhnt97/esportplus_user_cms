package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@WebServlet(name = "get-userbet", urlPatterns = {"/get-userbet"})
public class GetListUserBetRequest extends GetForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/bet-table/getlistbetuser";
    }

}
