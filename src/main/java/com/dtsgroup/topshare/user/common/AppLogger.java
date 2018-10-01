/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *
 * @author daua
 */
public class AppLogger {

    private static Logger logger = null;

    public static Logger getLogger() {
        if (AppLogger.logger == null) {
            AppLogger.logger = LoggerFactory.getLogger(Constant.LOGGER_NAME);
        }
        return AppLogger.logger;
    }

}
