package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "bet-table-get", urlPatterns = {"/bet-table-get"})
public class GetListBetTableRequest extends GetForwardRequest {
    @Override
    public String getRequestUrl() {
        return baseUrl() + "/bet-table/get";
    }
}
