/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.utils;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author daua1993
 */
public class AppUtils {

    private static final String DEFAULT_PATERN = "dd/MM/yyyy HH:mm:ss";
    private static final String DB_DATE_PATERN = "yyyy-MM-dd HH:mm:ss";
    private static final String ON_DATE_PATERN = "dd/MM/yyyy";

    public static String formatDateToDbDateString(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat(DB_DATE_PATERN);
        String format = formatter.format(date);
        return format;
    }

    public static String formatDateToOnlyDateString(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat(ON_DATE_PATERN);
        String format = formatter.format(date);
        return format;
    }

    public static int parseInt(Object o) {
        if (o == null) {
            return -1;
        }
        int value = -1;
        try {
            value = Integer.parseInt(String.valueOf(o));
        } catch (Exception e) {
            value = -1;
        }
        return value;

    }

    public static double parseDouble(Object o) {
        if (o == null) {
            return -1;
        }
        double value = -1;
        try {
            value = Double.parseDouble(String.valueOf(o));
        } catch (Exception e) {
            value = -1;
        }
        return value;
    }

    public static boolean parseBool(Object o) {
        if (o == null) {
            return false;
        }
        boolean value = false;
        try {
            value = Boolean.parseBoolean(String.valueOf(o));
        } catch (Exception e) {
            value = false;
        }
        return value;

    }

    public static Date parseDate(String s) throws ParseException {
        if (s == null || s.trim().length() == 0) {
            throw new ParseException("string for parse is null", 1);
        }
        System.out.println("string format = " + s);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DEFAULT_PATERN);
        Date date = simpleDateFormat.parse(s);
        return date;
    }

    public static Date parseMySQLDate(String s) throws ParseException {
        if (s == null || s.trim().length() == 0) {
            throw new ParseException("string for parse is null", 1);
        }
        System.out.println("string format = " + s);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        Date date = simpleDateFormat.parse(s);
        return date;
    }

    public static boolean checkIp(HttpServletRequest request) {
        return true;
//        String curIP = request.getHeader("X-FORWARDED-FOR");
//        if (curIP == null) {
//            curIP = request.getRemoteAddr();
//        }
//
//        AppLogger.getLogger().info("CurIp: " + curIP);
//        String acceptedIp = AppConfig.getConfig().getProperty("ACCEPTED_IP", "", "SETTINGS");
//        if (acceptedIp == null || acceptedIp.isEmpty()) {
//            return true;
//        }
//        if (acceptedIp.contains(",")) {
//            for (String ip : acceptedIp.split(",")) {
//                if (ip.equalsIgnoreCase(curIP)) {
//                    return true;
//                }
//            }
//        }
//        return acceptedIp.equalsIgnoreCase(curIP);
    }

    public static Long parseLong(Object o) {
        if (o == null) {
            return -1l;
        }
        long value = -1;
        try {
            value = Long.parseLong(String.valueOf(o));
        } catch (Exception e) {
            value = -1;
        }
        return value;
    }

    public static String parseString(Object o) {
        if (o == null) {
            return "";
        }
        String value = String.valueOf(o);
        if ("null".equals(value)) {
            value = "";
        }
        return value.trim();
    }

    public static String getServiceFromURI(String fullUri) {
        String[] s = fullUri.split("/");
        String url = s[s.length - 1];
        if (url.contains("#")) {
            String[] t = url.split("#");
            url = t[0];
        }
        if (url.contains("?")) {
            String[] t = url.split("\\?");
            url = t[0];
        }
        return url;
    }

    public static boolean checkFolderExist(String dir) {
        try {
            File f = new File(dir);
            if (!f.exists()) {
                f.mkdir();
                return false;
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
