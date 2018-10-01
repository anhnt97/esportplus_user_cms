/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.common;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 *
 * @author daua
 */
public class Constant {

    public final static String PATTERN_FORMAT_DATE = "dd/MM/yyyy HH:mm:ss";
    public final static String BASE_FOLDER = System.getProperty("user.home") + java.io.File.separator;
    public final static String CONFIG_FOLDER = BASE_FOLDER + "config" + java.io.File.separator + "topshare-user" + java.io.File.separator;
    public final static String LOGGER_NAME = "TOP_SHARED_USER";
    public final static String CONFIG_NAME = "TOP_SHARED_USER";
    
    public final static String CONFIG_FILE_NAME = "topshare-user.xml";
    public final static String ROLE_FILE_NAME = "role.json";
    public static final DateFormat PARTITION_DATE_FORMAT_MONTH = new SimpleDateFormat("yyyyMM");
    public static final DateFormat PARTITION_DATE_FORMAT_FULL = new SimpleDateFormat("yyyyMMdd");

    

}
