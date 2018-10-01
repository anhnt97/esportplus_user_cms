/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service.local;

import com.dtsgroup.topshare.user.job.Base64StringToImageProcess;
import com.dtsgroup.topshare.user.utils.AppUtils;
import org.json.simple.JSONObject;

import javax.servlet.annotation.WebServlet;
import java.util.HashMap;
import java.util.Map;

/**
 * @author daua1993
 */
@WebServlet(name = "uploadvideo-service", urlPatterns = {"/uploadvideo-service"})
public class UploadVideoService extends MultipartUploadBase {

    @Override
    public JSONObject executeRequest(Map<String, String> params) {
        JSONObject json = new JSONObject();
        String thumbData = AppUtils.parseString(params.get("thumb"));
        String thumb = "";
        if (thumbData != null && !"".equals(thumbData)) {
            thumbData = thumbData.substring("data:image/png;base64,".length());
            Base64StringToImageProcess process = new Base64StringToImageProcess(thumbData, Base64StringToImageProcess.IMAGE_TYPE_PNG);
            try {
                thumb = process.convert();
            } catch (Exception ex) {
                logger.error("", ex);
            }
        }
        if (!"".equals(thumb)) {
            json.put("rc", 0);
            json.put("rd", "OK");
            json.put("thumb", thumb);
        } else {
            json.put("rc", -1);
            json.put("rd", "Save thumb failure");
        }

        return json;
    }

    @Override
    protected Map<String, String> fieldsUnsave() {
        Map<String, String> fields = new HashMap<>();
        fields.put("thumb", "too long");
        return fields;
    }

}
