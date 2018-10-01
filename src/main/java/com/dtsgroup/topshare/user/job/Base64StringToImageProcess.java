/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.job;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.utils.AppUtils;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

/**
 *
 * @author daua1993
 */
public class Base64StringToImageProcess {

    public static final int IMAGE_TYPE_JPG = 1;
    public static final int IMAGE_TYPE_PNG = 2;

    private final Logger logger = LoggerFactory.getLogger(Base64StringToImageProcess.class);
    private final String base64Data;
    private final int outputImageType;

    public Base64StringToImageProcess(String base64Data, int outputImageType) {
        this.base64Data = base64Data;
        this.outputImageType = outputImageType;
    }

    public String convert() throws Exception {
        String folder = AppConfig.getConfig().getProperty("FOLDER_STORAGE", "/tmp/topshared_data", "SETTINGS");
        AppUtils.checkFolderExist(folder);
        String imageType = getImageType(outputImageType);
        StringBuilder sb = new StringBuilder();
        sb.append(folder).append(File.separator);
        sb.append(System.currentTimeMillis()).append("_");
        sb.append(UUID.randomUUID().toString());
        sb.append(".").append(imageType);
        String fileName = sb.toString();
        writeByteToImageFile(base64Data, fileName);
        return fileName;
    }

    private void writeByteToImageFile(String dataImage, String fileNameImage) throws Exception {
        byte[] bImg64 = dataImage.getBytes();
        byte[] bImg = Base64.decodeBase64(bImg64); // apache-commons-codec
        try (FileOutputStream fos = new FileOutputStream(fileNameImage)) {
            fos.write(bImg);
        }
    }

    private String getImageType(int type) throws Exception {
        if (type == IMAGE_TYPE_JPG) {
            return "jpeg";
        } else if (type == IMAGE_TYPE_PNG) {
            return "png";
        }
        throw new Exception("Not support this output format [" + type + "]");
    }
}
