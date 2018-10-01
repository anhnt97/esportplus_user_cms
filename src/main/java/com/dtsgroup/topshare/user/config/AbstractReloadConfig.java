package com.dtsgroup.topshare.user.config;

import com.dtsgroup.topshare.user.common.AppLogger;
import org.jconfig.ConfigurationManager;
import org.jconfig.ConfigurationManagerException;
import org.jconfig.event.FileListener;
import org.jconfig.handler.XMLFileHandler;
import org.slf4j.Logger;

import java.io.File;
import java.io.IOException;

public abstract class AbstractReloadConfig {

    protected static final Logger logger = AppLogger.getLogger();
    private XMLFileHandler fileHandler;
    private final String configName;

    public AbstractReloadConfig(String configName) {
        this.configName = configName;
    }

    public synchronized void reloadConfig(String configFolder, String configFileName) throws IOException, ConfigurationManagerException {

        File file = new File(configFolder);
        if (!file.exists()) {
            file.mkdirs();
        }

        file = new File(configFolder + configFileName);
        if (!file.exists()) {
            createDefaultConfigFile(file);
        }

        fileHandler = new XMLFileHandler();
        fileHandler.setFile(file);

        logger.info("ConfigFolder: " + configFolder);
        logger.info("ConfigFileName: " + configFileName);
        logger.info("ConfigName: " + configName);

        FileListener fileListener = ConfigFileListener.getInstance(configName);
        fileHandler.addFileListener(fileListener);

        ConfigurationManager cm = ConfigurationManager.getInstance();
        cm.load(fileHandler, configName);
    }

    public synchronized void saveConfig() throws ConfigurationManagerException {
        ConfigurationManager cm = ConfigurationManager.getInstance();
        cm.save(configName);
    }

    public abstract void createDefaultConfigFile(File fout) throws IOException;
}
