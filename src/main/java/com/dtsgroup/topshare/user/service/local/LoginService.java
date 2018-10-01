/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service.local;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.common.ErrorCodeDefs;
import com.dtsgroup.topshare.user.common.Permission;
import com.dtsgroup.topshare.user.utils.AppUtils;
import com.dtsgroup.topshare.user.utils.HttpUtils;
import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;
import com.google.gson.Gson;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 *
 * @author daua1993
 */
@WebServlet(name = "login", urlPatterns = {"/login"})
public class LoginService extends HttpServlet {

    private final Logger logger = LoggerFactory.getLogger(LoginService.class);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "86400");

        String username = AppUtils.parseString(request.getParameter("username"));
        String password = AppUtils.parseString(request.getParameter("password"));
        logger.info("==>LoginService user={} pass=*****", username);
        String passLv1 = Hashing.md5().hashString(password, Charsets.UTF_8).toString();
        String passLv2 = Hashing.md5().hashString(passLv1, Charsets.UTF_8).toString();

        String urlLogin = AppConfig.getConfig().getProperty("LOGIN_URL", "http://203.162.166.162:9938/api/auth", "URL");
        JSONObject jo = new JSONObject();
        jo.put("username", username);
        jo.put("password", passLv2);
        jo.put("usertype", 1);
        JSONObject resp = HttpUtils.postData(urlLogin, jo);
        logger.info("=>login resp= {}", resp);
        if (resp != null) {
            if (AppUtils.parseInt(resp.get("rc")) == ErrorCodeDefs.ERR_CODE_OK) {
                HttpSession session = request.getSession();
                session.setAttribute("username", username);
                int role = AppUtils.parseInt(resp.get("role"));
                session.setAttribute("role", role);
                session.setAttribute("displayName", AppUtils.parseString(resp.get("displayName")));
                session.setAttribute("loggedIn", true);
                String listRole = AppUtils.parseString(resp.get("list_role"));
                session.setAttribute("list_role", listRole);
                session.setAttribute("partnerId", AppUtils.parseString(resp.get("partnerId")));
                session.setAttribute("token", AppUtils.parseString(resp.get("token")));
                session.setAttribute("login_type", 0);
                session.setAttribute("social_token", "");
                Permission.getInstance().setListRole(listRole);
                logger.info("{} Login success role = {}", username, role);
            }
        }
        try (PrintWriter out = response.getWriter()) {
            out.print(new Gson().toJson(resp));
            out.flush();
            out.close();
        }

    }

}
