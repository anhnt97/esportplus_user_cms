/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.common;

import com.dtsgroup.topshare.user.config.AbstractReloadConfig;
import com.dtsgroup.topshare.user.config.IDetectConfigChange;
import org.jconfig.Configuration;
import org.jconfig.ConfigurationManager;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author daua
 */
public class AppConfig extends AbstractReloadConfig implements IDetectConfigChange {

    private static Configuration jconfig = null;

    public AppConfig() {
        super(Constant.CONFIG_NAME);
    }

    public synchronized static Configuration getConfig() {
        if (jconfig == null) {
            jconfig = ConfigurationManager.getConfiguration(Constant.CONFIG_NAME);
        }
        return jconfig;
    }

    public static void reload() {
        synchronized (jconfig) {
            jconfig = ConfigurationManager.getConfiguration(Constant.CONFIG_NAME);
        }
    }

    @Override
    public void createDefaultConfigFile(File fout) throws IOException {
        List<String> lines = new ArrayList<>();
        lines.add("<?xml version=\"1.0\" ?>");
        lines.add("\t<properties>");
        lines.add("\t\t<category name=\"MYSQL\">");
        lines.add("\t\t\t<property name=\"URL\" value=\"jdbc:mysql://127.0.0.1:3306/cardp2admin?characterEncoding=UTF8\"/>");
        lines.add("\t\t\t<property name=\"USERNAME\" value=\"root\"/>");
        lines.add("\t\t\t<property name=\"PASSWORD\" value=\"dautv@123\"/>");
        lines.add("\t\t\t<property name=\"MAX_LIMIT\" value=\"5\"/>");
        lines.add("\t\t\t<property name=\"AUTO_COMMIT\" value=\"false\"/>");
        lines.add("\t\t</category>");
        lines.add("\t\t<category name=\"SETTINGS\">");
        lines.add("\t\t\t<property name=\"ACCEPTED_IP\" value=\"127.0.0.1\"/>");
        lines.add("\t\t</category>");
        lines.add("\t</properties>");
        writeArrayToFile(lines, fout);
    }

    private int writeArrayToFile(List<String> list, File file) {
        int ret = -1;
        BufferedWriter outputWriter;
        try {
            outputWriter = new BufferedWriter(new FileWriter(file));
            for (String s : list) {
                outputWriter.write(s);
                outputWriter.newLine();
            }
            outputWriter.flush();
            outputWriter.close();
            ret = 0;
        } catch (IOException e) {
            logger.error("{}", e);
        }
        return ret;
    }

    @Override
    public void onConfigChanged() {
        logger.info("AppConfig reload config !");
        reload();
        Permission.getInstance().reload();
    }

}
