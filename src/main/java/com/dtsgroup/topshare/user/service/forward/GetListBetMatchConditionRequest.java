/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.GetForwardRequest;

import javax.servlet.annotation.WebServlet;

/**
 *
 * @author daua1993
 */
@WebServlet(name = "get-bet-match-con", urlPatterns = {"/get-bet-match-con"})
public class GetListBetMatchConditionRequest extends GetForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/bet-match-condition/get";
    }

}
