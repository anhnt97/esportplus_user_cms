/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service.local;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.common.ErrorCodeDefs;
import com.dtsgroup.topshare.user.common.MessageDefs;
import com.dtsgroup.topshare.user.entities.VideoInfo;
import com.dtsgroup.topshare.user.job.ConvertGifToMp4Process;
import com.dtsgroup.topshare.user.utils.AppUtils;
import com.dtsgroup.topshare.user.utils.HttpUtils;
import org.apache.commons.fileupload.FileItem;
import org.json.simple.JSONObject;

import javax.servlet.annotation.WebServlet;
import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * @author daua1993
 */
@WebServlet(name = "uploadgif-service", urlPatterns = {"/uploadgif-service"})
public class UploadGifService extends MultipartUploadBase {

    @Override
    public JSONObject executeRequest(Map<String, String> params) {
        JSONObject json = new JSONObject();
        if (files.isEmpty()) {
            logger.info("List file gif is empty ...");
            json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_PARAMS_INVALID);
            json.put(MessageDefs.EXT_FIELD_RESDESC, "File does't exist, please try again");
        } else {
            String folder = AppConfig.getConfig().getProperty("FOLDER_STORAGE", "/tmp/topshared_data", "SETTINGS");
            AppUtils.checkFolderExist(folder);
            String fileName = folder + File.separator + username + "_" + UUID.randomUUID().toString() + ".gif";
            FileItem item = files.get(0);
            File file = new File(fileName);
            boolean check = false;
            try {
                item.write(file);
                check = true;
            } catch (Exception ex) {
                logger.error("Exception: ", ex);
            }
            if (!check) {
                logger.info("Save gif file {} to disk failure", fileName);
                json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
                json.put(MessageDefs.EXT_FIELD_RESDESC, "Upload file failure");
            } else {
                logger.info("Save gif file {} to disk success", fileName);
                ConvertGifToMp4Process converter = new ConvertGifToMp4Process(username, fileName);
                check = false;
                String outFile = null;
                try {
                    outFile = converter.convertToMp4();
                    check = true;
                } catch (Exception ex) {
                    logger.error("Exception: ", ex);
                }

                if (check) {

                    logger.info("Convert gif to mp4 success ...");

                    String url = AppConfig.getConfig().getProperty("API_URL", "http://45.124.95.231:9981/api", "URL");
                    url += "/upload/gif";

                    VideoInfo videoInfo = converter.getResolution(outFile);
                    logger.info("Video info: {}", videoInfo);

                    Map<String, String> textPrams = new HashMap<>();
                    textPrams.put("created_by", username);
                    textPrams.put("duration", AppUtils.parseString(videoInfo.getDuration()));
                    textPrams.put("width", AppUtils.parseString(videoInfo.getWidth()));
                    textPrams.put("height", AppUtils.parseString(videoInfo.getHeight()));

                    Map<String, String> filePrams = new HashMap<>();
                    filePrams.put("file_gif", fileName);
                    filePrams.put("file_mp4", outFile);

                    JSONObject jo = HttpUtils.upload(url, filePrams, textPrams);
                    if (jo != null) {
                        logger.info("Upload Gif to admin api success !!!");
                        json = jo;
                    } else {
                        logger.info("Upload Gif to admin api failure !!!");
                        deleteFile(outFile);
                        deleteFile(file);
                        json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
                        json.put(MessageDefs.EXT_FIELD_RESDESC, "Upload file failure");
                    }
                } else {
                    logger.info("Convert gif to mp4 failure ...");
                    deleteFile(file);
                    json.put(MessageDefs.EXT_FIELD_RESCODE, ErrorCodeDefs.ERR_CODE_FAILED);
                    json.put(MessageDefs.EXT_FIELD_RESDESC, "Convert file to mp4 format failure");
                }
            }
        }
        logger.info("result: {}", json);
        return json;
    }

}
