package com.dtsgroup.topshare.user.config;

import org.jconfig.ConfigurationManager;
import org.jconfig.ConfigurationManagerException;
import org.jconfig.event.FileListener;
import org.jconfig.event.FileListenerEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class ConfigFileListener implements FileListener {

    private static final Logger logger = LoggerFactory.getLogger(ConfigFileListener.class.getSimpleName());
    private static ConfigFileListener instance;
    private final String configName;
    private List<IDetectConfigChange> mObserver;

    private ConfigFileListener(String configName) {
        this.configName = configName;
        this.mObserver = new ArrayList<>();
    }

    public synchronized static ConfigFileListener getInstance(String configName) {
        if (instance == null) {
            instance = new ConfigFileListener(configName);
        }
        return instance;
    }

    @Override
    public void fileChanged(FileListenerEvent arg0) {
        try {
            ConfigurationManager.getInstance().reload(configName);
            logger.info("Config file changed. System config reloaded and posting event to all subscribers");
            if (this.mObserver != null) {
                for (IDetectConfigChange i : this.mObserver) {
                    if (i != null) {
                        i.onConfigChanged();
                    }
                }
            }
        } catch (ConfigurationManagerException ex) {
            logger.error("{}", ex);
        }
    }

    public void registObserver(IDetectConfigChange i) {
        if (this.mObserver == null) {
            this.mObserver = new ArrayList<>();
        }
        this.mObserver.add(i);
    }
}
