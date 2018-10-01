/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.common.AppLogger;
import com.dtsgroup.topshare.user.common.Constant;
import com.dtsgroup.topshare.user.common.Permission;
import com.dtsgroup.topshare.user.config.ConfigFileListener;
import org.apache.log4j.xml.DOMConfigurator;
import org.jconfig.ConfigurationManagerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 *
 * @author daua1993
 */
public class Main extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.print("Hello funny guy !!!");
            out.flush();
            out.close();
        }
    }

    @Override
    public void init() throws ServletException {
        try {
            super.init();

            //Load config log4j
            DOMConfigurator.configureAndWatch(Constant.CONFIG_FOLDER + "LogConfig.log4j.xml");
            Logger logger = LoggerFactory.getLogger("TEST");

            logger.info("server inited !!");
            logger.info("===============!");
            logger.info("init server !!!!");
            logger.info("CONFIG_FOLDER: = " + Constant.CONFIG_FOLDER);

            // Load Config
            AppConfig cfg = new AppConfig();
            cfg.reloadConfig(Constant.CONFIG_FOLDER, Constant.CONFIG_FILE_NAME);
            ConfigFileListener.getInstance(Constant.CONFIG_NAME).registObserver(cfg);

            //Load role
            Permission pms = Permission.getInstance();
            pms.init();
            System.out.println("Init server !!!");

        } catch (IOException ex) {
            AppLogger.getLogger().error("Load Config Failed {}", ex);
        } catch (ConfigurationManagerException ex) {
            AppLogger.getLogger().error("ConfigurationManagerException {}", ex);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

}
