package com.dtsgroup.topshare.user.service.local;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.common.ErrorCodeDefs;
import com.dtsgroup.topshare.user.common.MessageDefs;
import com.dtsgroup.topshare.user.utils.AppUtils;
import com.dtsgroup.topshare.user.utils.HttpUtils;
import org.apache.commons.fileupload.FileItem;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import javax.servlet.annotation.WebServlet;
import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@WebServlet(name = "upload-video-content", urlPatterns = {"/upload-video-content"})
public class UploadVideoContentService extends MultipartUploadBase {

    @Override
    public JSONObject executeRequest(Map<String, String> params) {
        JSONObject json = new JSONObject();

        if (files.isEmpty()) {
            json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_PARAMS_INVALID);
            json.put(MessageDefs.EXT_FIELD_RESDESC, "Video File not exist, please try again");
        } else {
            FileItem item = files.get(0);
            String fileName = item.getName();
            long fileSize = item.getSize();
            float sizeMb = calculateFileSize(fileSize);
            logger.info("fileName={}, fileSize={}, sizeMb={}", fileName, fileSize, sizeMb);
            double maxFileSize = AppConfig.getConfig().getDoubleProperty("MAX_VIDEO_SIZE", 50, "SETTINGS");
            if (sizeMb > maxFileSize) {
                json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
                json.put(MessageDefs.EXT_FIELD_RESDESC, "File size too big, please try other");
            } else {
                String folder = AppConfig.getConfig().getProperty("FOLDER_STORAGE", "/tmp/topshared_data", "SETTINGS");
                AppUtils.checkFolderExist(folder);
                fileName = folder + File.separator + username + "_" + UUID.randomUUID().toString() + "_" + fileName;
                File file = new File(fileName);
                boolean check = false;
                try {
                    item.write(file);
                    check = true;
                } catch (Exception ex) {
                    logger.error("Exception: ", ex);
                }
                if (!check) {
                    json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
                    json.put(MessageDefs.EXT_FIELD_RESDESC, "Upload video failed");
                } else {

                    String jsonString = params.get("form_info");
                    JSONObject jsonParams = null;
                    try {
                        jsonParams = HttpUtils.convertStringToJson(jsonString);
                    } catch (ParseException e) {
                        logger.error("ex: ", e);
                    }

                    if (jsonParams != null) {
                        jsonParams.put("creator", username);
                        String url = AppConfig.getConfig().getProperty("API_URL", "http://45.124.95.231:9981/api", "URL");
                        url += "/upload/content";

                        String jsonS = jsonParams.toJSONString();

                        Map<String, String> textPrams = new HashMap<>();
                        textPrams.put("content", jsonS);

                        Map<String, String> filePrams = new HashMap<>();
                        filePrams.put("file_mp4", fileName);
                        JSONObject jo = HttpUtils.upload(url, filePrams, textPrams);

                        if (jo != null) {
                            json = jo;
                        } else {
                            json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
                            json.put(MessageDefs.EXT_FIELD_RESDESC, "Upload content fail");
                        }
                    } else {
                        json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
                        json.put(MessageDefs.EXT_FIELD_RESDESC, "Upload content fail");
                    }
                    deleteFile(file);
                }
            }
        }
        return json;
    }

    private float calculateFileSize(long size) {
        return (float) size / 1048576;
    }

    @Override
    protected Map<String, String> fieldsUnsave() {
        Map<String, String> fields = new HashMap<>();
        fields.put("thumb", "too long, cannot print");
        return fields;
    }

}
