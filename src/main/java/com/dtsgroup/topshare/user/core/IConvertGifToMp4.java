package com.dtsgroup.topshare.user.core;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.utils.AppUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.UUID;

public abstract class IConvertGifToMp4 {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());
    protected final String username;
    protected final String inputFile;

    public IConvertGifToMp4(String username, String inputFile) {
        this.username = username;
        this.inputFile = inputFile;
    }

    public abstract String convert() throws Exception;

    protected String buildOutputName() {
        String folder = AppConfig.getConfig().getProperty("FOLDER_STORAGE", "/tmp/topshared_data", "SETTINGS");
        AppUtils.checkFolderExist(folder);
        StringBuilder sb = new StringBuilder();
        sb.append(folder);
        sb.append(File.separator);
        sb.append(username);
        sb.append("_");
        sb.append(UUID.randomUUID().toString());
        sb.append(".mp4");
        return sb.toString();
    }

}
