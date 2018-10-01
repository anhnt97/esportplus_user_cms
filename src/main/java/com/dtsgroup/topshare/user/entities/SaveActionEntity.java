/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.entities;

import com.dtsgroup.topshare.user.db.MySQLActions;
import eu.bitwalker.useragentutils.Browser;
import eu.bitwalker.useragentutils.OperatingSystem;
import eu.bitwalker.useragentutils.UserAgent;
import eu.bitwalker.useragentutils.Version;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author daua1993
 */
public class SaveActionEntity {

    private final HttpServletRequest request;
    private final Logger logger = LoggerFactory.getLogger(SaveActionEntity.class);

    private final String username;

    public SaveActionEntity(HttpServletRequest request) {
        this.request = request;
        HttpSession session = request.getSession();
        String user = (String) session.getAttribute("username");
        this.username = user;
    }

    public void save(String action, String req, String result, String adminNote) {
        RequestInfo info = getRequestInfo(request);
        MySQLActions db = new MySQLActions();
        db.saveAdminAction(
                username,
                action,
                result,
                req,
                adminNote,
                info.getIp(),
                info.getOs(),
                info.getBrowser()
        );
    }

    public RequestInfo getRequestInfo(HttpServletRequest request) {

        String osName = "unknow";
        String browserName = "unknow";
        String ip = "unknow";

        if (request != null) {

            String browserDetails = request.getHeader("User-Agent");

            if (browserDetails != null) {
                UserAgent userAgent = UserAgent.parseUserAgentString(browserDetails);

                try {
                    OperatingSystem os = userAgent.getOperatingSystem();
                    StringBuilder sb = new StringBuilder();
                    sb.append(os.getName()).append(" ");
                    sb.append(os.getDeviceType().getName()).append(" ");
                    sb.append(os.getId());
                    osName = sb.toString();
                } catch (Exception ex) {
                    logger.error("get OS Name Faied{}", ex);
                    osName = browserDetails;
                }

                try {
                    Browser browser = userAgent.getBrowser();
                    browser.getName();
                    Version browserVersion = userAgent.getBrowserVersion();
                    browserVersion.getVersion();
                    StringBuilder sb1 = new StringBuilder();
                    sb1.append(browser.getName()).append(" ");
                    sb1.append(browserVersion.getVersion());
                    browserName = sb1.toString();
                } catch (Exception ex) {
                    logger.error("get Browser Name Faied{}", ex);
                    browserName = browserDetails;
                }
            }

            String curIP = request.getHeader("X-FORWARDED-FOR");
            if (curIP == null) {
                curIP = request.getRemoteAddr();
            }
            if (curIP != null) {
                ip = curIP;
            }
        }

        RequestInfo info = new RequestInfo();
        info.setOs(osName);
        info.setBrowser(browserName);
        info.setIp(ip);

        return info;
    }
}
