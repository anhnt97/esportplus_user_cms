package com.dtsgroup.topshare.user.service.local;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.common.ErrorCodeDefs;
import com.dtsgroup.topshare.user.common.MessageDefs;
import com.dtsgroup.topshare.user.utils.AppUtils;
import com.dtsgroup.topshare.user.utils.HttpUtils;
import org.apache.commons.fileupload.FileItem;
import org.json.simple.JSONObject;

import javax.servlet.annotation.WebServlet;
import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@WebServlet(name = "nmp4-service", urlPatterns = {"/nmp4-service"})
public class UploadNotMp4Service extends MultipartUploadBase {
    @Override
    public JSONObject executeRequest(Map<String, String> params) {
        JSONObject json = new JSONObject();
        if (files.isEmpty()) {
            logger.info("List file is empty ...");
            json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_PARAMS_INVALID);
            json.put(MessageDefs.EXT_FIELD_RESDESC, "File not exist, Please try again");
        } else {

            FileItem item = files.get(0);
            String folder = AppConfig.getConfig().getProperty("FOLDER_STORAGE", "/tmp/topshared_data", "SETTINGS");
            AppUtils.checkFolderExist(folder);
            String fileName = folder + File.separator + username + "_" + UUID.randomUUID().toString() + "_" + item.getName();

            File file = new File(fileName);
            boolean check = false;
            try {
                item.write(file);
                check = true;
            } catch (Exception ex) {
                logger.error("Exception: ", ex);
            }
            if (!check) {
                logger.info("Save file {} to disk failure !!!", fileName);
                json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
                json.put(MessageDefs.EXT_FIELD_RESDESC, "Upload File failure");
            } else {

                logger.info("Save file {} to disk success !!!", fileName);

                String url = AppConfig.getConfig().getProperty("API_URL", "http://45.124.95.231:9981/api", "URL");
                url += "/upload/video";

                Map<String, String> textPrams = new HashMap<>();
                textPrams.put("created_by", username);

                Map<String, String> filePrams = new HashMap<>();
                filePrams.put("file_video", fileName);
                JSONObject jo = HttpUtils.upload(url, filePrams, textPrams);
                logger.info("Upload non mp4 file to admin api result: {}", jo);
                if (jo != null) {
                    json = jo;
                } else {
                    json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
                    json.put(MessageDefs.EXT_FIELD_RESDESC, "Upload File failure");
                }
                deleteFile(file);
            }
        }
        return json;
    }
}
