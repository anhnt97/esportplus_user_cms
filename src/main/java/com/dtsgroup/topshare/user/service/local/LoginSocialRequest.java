package com.dtsgroup.topshare.user.service.local;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.common.ErrorCodeDefs;
import com.dtsgroup.topshare.user.common.MessageDefs;
import com.dtsgroup.topshare.user.common.Permission;
import com.dtsgroup.topshare.user.utils.AppUtils;
import com.dtsgroup.topshare.user.utils.HttpUtils;
import com.google.common.base.Strings;
import com.google.gson.Gson;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "login-social", urlPatterns = {"/login-social"})
public class LoginSocialRequest extends HttpServlet {
    private final Logger logger = LoggerFactory.getLogger(LoginSocialRequest.class);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "86400");

        String urlLogin = AppConfig.getConfig().getProperty("API_URL", "http://45.124.95.231:9981/api", "URL");
        urlLogin += "/auth/login/creator/social";

        JSONObject params = getParams(request);
        params.put("usertype", 1);

        int loginType = AppUtils.parseInt(params.get("loginType"));
        String token = AppUtils.parseString(params.get("token"));

        JSONObject resp = new JSONObject();
        if (Strings.isNullOrEmpty(token)) {
            logger.info("Token invalid");
            resp.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
            resp.put(MessageDefs.EXT_FIELD_RESDESC, "Login failure");
        } else {

            boolean check = true;
            LoginSocialResult loginSocialResult = null;
            logger.info("login type = {}", loginType);
            if (loginType == 1) {
                Map<String, String> p = new HashMap<>();
                p.put("fields", "id,name,birthday,gender,email,picture.type(large),cover.type(large)");
                p.put("access_token", token);
                JSONObject jsonLogin = HttpUtils.getData("https://graph.facebook.com/me", p);
                logger.info("json ff : " + jsonLogin.toJSONString());

                if (jsonLogin.containsKey("id")) {
                    String id = AppUtils.parseString(jsonLogin.get("id"));
                    String name = AppUtils.parseString(jsonLogin.get("name"));
                    String img = "";
                    if (jsonLogin.containsKey("picture")) {
                        JSONObject pic = (JSONObject) jsonLogin.get("picture");
                        if (pic != null && pic.containsKey("data")) {
                            JSONObject data = (JSONObject) pic.get("data");
                            if (data != null && data.containsKey("url")) {
                                img = AppUtils.parseString(data.get("url"));
                            }
                        }
                    }
                    loginSocialResult = new LoginSocialResult();
                    loginSocialResult.setUid(id);
                    loginSocialResult.setImg(img);
                    loginSocialResult.setName(name);
                    loginSocialResult.setToken(token);
                }

            } else if (loginType == 2) {
                Map<String, String> p = new HashMap<>();
                p.put("alt", "json");
                p.put("access_token", token);
                JSONObject jsonLogin = HttpUtils.getData("https://www.googleapis.com/oauth2/v1/userinfo", p);
                logger.info("json gg : " + jsonLogin.toJSONString());

                if (jsonLogin.containsKey("id")) {
                    String id = AppUtils.parseString(jsonLogin.get("id"));
                    String name = AppUtils.parseString(jsonLogin.get("name"));
                    String picture = AppUtils.parseString(jsonLogin.get("picture"));
                    loginSocialResult = new LoginSocialResult();
                    loginSocialResult.setUid(id);
                    loginSocialResult.setImg(picture);
                    loginSocialResult.setName(name);
                    loginSocialResult.setToken(token);
                }

            } else {
                check = false;
            }

            if (!check) {
                resp.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
                resp.put(MessageDefs.EXT_FIELD_RESDESC, "Login failure");
                logger.info("login type incorrect");
            } else {
                if (loginSocialResult == null) {
                    resp.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
                    resp.put(MessageDefs.EXT_FIELD_RESDESC, "Login failure");
                    logger.info("get account info by token {} failure", token);
                } else {
                    JSONObject p = new JSONObject();
                    p.put("loginType", loginType);
                    p.put("userId", loginSocialResult.getUid());
                    p.put("name", loginSocialResult.getName());
                    p.put("picture", loginSocialResult.getImg());
                    p.put("token", loginSocialResult.getToken());

                    resp = HttpUtils.postData(urlLogin, p);

                    if (resp != null) {
                        if (AppUtils.parseInt(resp.get("rc")) == ErrorCodeDefs.ERR_CODE_OK) {
                            HttpSession session = request.getSession();
                            session.setAttribute("username", AppUtils.parseString(params.get("userId")));
                            int role = AppUtils.parseInt(resp.get("role"));
                            session.setAttribute("role", role);
                            session.setAttribute("displayName", AppUtils.parseString(resp.get("displayName")));
                            session.setAttribute("loggedIn", true);
                            String listRole = AppUtils.parseString(resp.get("list_role"));
                            session.setAttribute("list_role", listRole);
                            session.setAttribute("partnerId", AppUtils.parseString(resp.get("partnerId")));
                            session.setAttribute("token", AppUtils.parseString(resp.get("token")));
                            session.setAttribute("login_type", AppUtils.parseInt(resp.get("loginType")));
                            session.setAttribute("social_token", AppUtils.parseInt(params.get("token")));
                            Permission.getInstance().setListRole(listRole);
                            logger.info("{} Login success role = {}", params.get("userId"), role);
                        }
                    }
                }
            }
        }

        logger.info("=>login resp= {}", resp);
        try (PrintWriter out = response.getWriter()) {
            out.print(new Gson().toJson(resp));
            out.flush();
            out.close();
        }

    }

    class LoginSocialResult {

        private String uid;
        private String name;
        private String img;
        private String token;

        public String getUid() {
            return uid;
        }

        public void setUid(String uid) {
            this.uid = uid;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getImg() {
            return img;
        }

        public void setImg(String img) {
            this.img = img;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        @Override
        public String toString() {
            return "LoginSocialResult{" +
                    "uid='" + uid + '\'' +
                    ", name='" + name + '\'' +
                    ", img='" + img + '\'' +
                    ", token='" + token + '\'' +
                    '}';
        }
    }

    private JSONObject getParams(HttpServletRequest request) {
        JSONObject jsonObject = null;
        BufferedReader br = null;
        try {
            String json;
            try (InputStream in = new BufferedInputStream(request.getInputStream())) {
                json = org.apache.commons.io.IOUtils.toString(in, "UTF-8");
            }
            logger.info("json = " + json);
            jsonObject = HttpUtils.convertStringToJson(json);
        } catch (IOException | ParseException ex) {
            logger.error("", ex);
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException ex) {
                logger.error("", ex);
            }
        }
        return jsonObject;
    }


}
