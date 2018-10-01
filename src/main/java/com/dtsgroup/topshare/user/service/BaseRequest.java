/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.common.ErrorCodeDefs;
import com.dtsgroup.topshare.user.common.MessageDefs;
import com.dtsgroup.topshare.user.entities.SaveActionEntity;
import com.dtsgroup.topshare.user.utils.AppUtils;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author daua1993
 */
public abstract class BaseRequest extends HttpServlet {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass().getSimpleName());
    protected String username;
    protected int role;
    protected Map<String, String> params = new HashMap<>();
    protected JSONObject paramsJson = null;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "86400");

        try (PrintWriter out = response.getWriter()) {

            JSONObject result = new JSONObject();
            boolean maintain = checkMaintain();
            if (maintain) {
                result = new JSONObject();
                result.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_SYSTEM_MAINTAIN);
                result.put(MessageDefs.EXT_FIELD_RESDESC, "System maintain");
                out.print(out);
                out.flush();
                return;
            }

            boolean check = checkRequest(request);
            if (!check) {
                result.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_REQUEST_INVALID);
                result.put(MessageDefs.EXT_FIELD_RESDESC, "Request invalid");
                out.print(result);
                out.flush();
                return;
            }

            params = getParams(request);
            printParams(params);

            result = executeRequest(params);

            if (storageAction()) {
                if (params != null && !params.isEmpty()) {
                    paramsJson = new JSONObject(params);
                } else if (paramsJson == null) {
                    paramsJson = new JSONObject();
                }
                saveAction(request, paramsJson, this.getClass().getSimpleName(), result, getNoteAction());
            }

            out.print(result);
            out.flush();

        }
    }

    public abstract JSONObject executeRequest(Map<String, String> params);

    public abstract boolean storageAction();

    protected String getNoteAction() {
        return "no comment";
    }

    private void printParams(Map<String, String> params) {
        if (print()) {
            Map<String, String> unPrints = fieldsUnsave();
            if (unPrints == null) {
                unPrints = new HashMap<>();
            }
            if (params != null && params.size() > 0) {
                String name = this.getClass().getSimpleName();
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    if (unPrints.get(entry.getKey()) == null) {
                        logger.info(name + " PAPRAM: " + entry.getKey() + ": " + entry.getValue());
                    } else {
                        logger.info(name + " PAPRAM: " + entry.getKey() + ": " + unPrints.get(entry.getKey()));
                    }
                }
            }
        }
    }

    protected boolean checkMaintain() {
        int maintain = AppConfig.getConfig().getIntProperty("MAINTAIN", 0, "SETTINGS");
        return maintain == 1;
    }

    protected boolean checkRequest(HttpServletRequest request) {
        try {

            if (!AppUtils.checkIp(request)) {
                return false;
            }

            HttpSession session = request.getSession();
            if (session == null
                    || session.getAttribute("username") == null
                    || session.getAttribute("role") == null
                    || session.getAttribute("loggedIn") == null) {
                return false;
            }

            int role_ = AppUtils.parseInt(session.getAttribute("role"));

            //kiem tra role
            this.username = AppUtils.parseString(session.getAttribute("username"));
            this.role = role_;

            return true;

        } catch (Exception ex) {
            logger.error("Exception: ", ex);
            return false;
        }
    }

    protected abstract Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException;

    protected void saveAction(HttpServletRequest req, JSONObject params, String name, JSONObject result, String note) {
        if (params != null && result != null) {
            Map<String, String> fields = fieldsUnsave();
            if (fields != null && !fields.isEmpty()) {
                for (Map.Entry<String, String> entry : fields.entrySet()) {
                    if (params.get(entry.getKey()) != null) {
                        params.put(entry.getKey(), entry.getValue());
                    }
                }
            }
            SaveActionEntity entity = new SaveActionEntity(req);
            entity.save(name, params.toString(), result.toString(), note);
        }
    }

    protected boolean print() {
        return true;
    }

    protected Map<String, String> fieldsUnsave() {
        return null;
    }

}
