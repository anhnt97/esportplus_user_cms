package com.dtsgroup.topshare.user.service.local;

import com.dtsgroup.topshare.user.common.ErrorCodeDefs;
import com.dtsgroup.topshare.user.common.MessageDefs;
import com.dtsgroup.topshare.user.service.PostBaseRequest;
import com.dtsgroup.topshare.user.utils.AppUtils;
import com.dtsgroup.topshare.user.utils.HttpUtils;
import com.google.common.base.Strings;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import sun.misc.BASE64Encoder;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

import static com.dtsgroup.topshare.user.job.Base64StringToImageProcess.IMAGE_TYPE_JPG;
import static com.dtsgroup.topshare.user.job.Base64StringToImageProcess.IMAGE_TYPE_PNG;

@WebServlet(name = "img-service", urlPatterns = {"/img-service"})
public class GetBase64ImageService extends PostBaseRequest {
    @Override
    public JSONObject executeRequest(Map<String, String> params) {
        logger.info("image :" + params);
        JSONObject json = new JSONObject();
        JSONArray jArrRet = new JSONArray();
        JSONArray jArr = (JSONArray) paramsJson.get("rows");
        if (jArr != null && !jArr.isEmpty()) {
            for (int i = 0; i < jArr.size(); ++i) {
                JSONObject jo = (JSONObject) jArr.get(i);
                String url = AppUtils.parseString(jo.get("url"));
                int id = AppUtils.parseInt(jo.get("id"));

                if (!Strings.isNullOrEmpty(url)) {
                    try {
                        String base64 = getBase64FromLink(url);
                        if (!Strings.isNullOrEmpty(base64)) {
                            int fileType = detectTypeImage(base64);
                            if (fileType == IMAGE_TYPE_JPG || fileType == IMAGE_TYPE_PNG) {
                                String prefix = "data:image/jpeg;base64,";
                                if (fileType == IMAGE_TYPE_PNG) {
                                    prefix = "data:image/png;base64,";
                                }
                                base64 = base64.replaceAll("\n", "");
                                base64 = prefix + base64;
                                JSONObject j = new JSONObject();
                                j.put("id", id);
                                j.put("url", url);
                                j.put("data", base64);
                                jArrRet.add(j);
                            }
                        }
                    } catch (Exception e) {
                        logger.error("", e);
                    }
                }
            }
            json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_OK);
            json.put(MessageDefs.EXT_FIELD_RESDESC, "OK");
            json.put("rows", jArrRet);

        } else {
            json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_SYSTEM_MAINTAIN);
            json.put(MessageDefs.EXT_FIELD_RESDESC, "Data lost");
        }
        return json;
    }

    @Override
    public boolean storageAction() {
        return false;
    }

    private int detectTypeImage(String thumb) {
        switch (thumb.charAt(0)) {
            case '/':
                return IMAGE_TYPE_JPG;
            case 'i':
                return IMAGE_TYPE_PNG;
            default:
                break;
        }
        return -1;
    }

    private String getBase64FromLink(String inputURL) throws Exception {
        try {
            CloseableHttpClient client = HttpClients.createDefault();
            HttpGet request = new HttpGet(inputURL);
            HttpResponse response = client.execute(request);
            BufferedInputStream bis = new BufferedInputStream(response.getEntity().getContent());
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            byte[] chunk = new byte[1024];
            int read;
            do {
                read = bis.read(chunk);
                if (read >= 0) {
                    bos.write(chunk, 0, read);
                }
            } while (read >= 0);
            BASE64Encoder encoder = new BASE64Encoder();
            String output = encoder.encode(bos.toByteArray());
            bos.close();
            bis.close();
            return output;
        } catch (Exception e) {
            logger.error("Exception: ", e);
            throw e;
        }
    }

    @Override
    protected Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException {
        BufferedReader br = null;
        try {
            String json;
            try (InputStream in = new BufferedInputStream(request.getInputStream())) {
                json = org.apache.commons.io.IOUtils.toString(in, "UTF-8");
            }
            logger.info("json = " + json);
            paramsJson = HttpUtils.convertStringToJson(json);
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
        if (paramsJson == null) {
            paramsJson = new JSONObject();
        }
        paramsJson.put("create_by", username);
        if (params == null) {
            params = new HashMap<>();
        }
        params.clear();
        return null;
    }
}
