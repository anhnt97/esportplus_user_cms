/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service.local;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.common.ErrorCodeDefs;
import com.dtsgroup.topshare.user.common.MessageDefs;
import com.dtsgroup.topshare.user.service.PostBaseRequest;
import com.dtsgroup.topshare.user.utils.AppUtils;
import com.dtsgroup.topshare.user.utils.HttpUtils;
import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;
import org.json.simple.JSONObject;

import javax.servlet.annotation.WebServlet;
import java.util.Map;

/**
 * @author daua1993
 */
@WebServlet(name = "changepass", urlPatterns = {"/changepass"})
public class ChangePasswordService extends PostBaseRequest {

    @Override
    public JSONObject executeRequest(Map<String, String> params) {

        String oldpass = AppUtils.parseString(params.get("oldpass"));
        String newpass = AppUtils.parseString(params.get("newpass"));

        JSONObject jo = new JSONObject();
        if (!username.equals("") && !"".equals(oldpass) && !"".equals(newpass)) {

            String passLv1 = Hashing.md5().hashString(oldpass, Charsets.UTF_8).toString();
            String passLv2 = Hashing.md5().hashString(passLv1, Charsets.UTF_8).toString();

            String passNLv1 = Hashing.md5().hashString(newpass, Charsets.UTF_8).toString();
            String passNLv2 = Hashing.md5().hashString(passNLv1, Charsets.UTF_8).toString();

            String urlChange = AppConfig.getConfig().getProperty("LOGIN_CHANGE_PASS", "http://45.124.95.231:9981/api/auth/changepassword", "URL");
            JSONObject json = new JSONObject();
            json.put("uid", username);
            json.put("oldPass", passLv2);
            json.put("newPass", passNLv2);
            JSONObject resp = HttpUtils.postData(urlChange, json);
            logger.info("=>changepass resp= {}", resp);

            if (resp == null) {
                jo.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_PARAMS_INVALID);
                jo.put(MessageDefs.EXT_FIELD_RESDESC, "Change password failed");
            }

            jo = resp;

        } else {

            jo.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_PARAMS_INVALID);
            jo.put(MessageDefs.EXT_FIELD_RESDESC, "Params invalid, please try again");

        }

        logger.info("ChangePasswordService result = {}", jo);
        return jo;
    }

    @Override
    protected String getNoteAction() {
        return "Admin " + this.username + " thay đổi mật khẩu";
    }

}
