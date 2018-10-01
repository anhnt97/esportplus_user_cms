/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.db;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author daua1993
 */
public class MySQLActions {

    private final Logger logger = LoggerFactory.getLogger(MySQLActions.class);

//    public LoginResult login(String username, String password) {
//        LoginResult res = new LoginResult();
//
//        String sql = "{call proc_omap_login(?,?,?,?,?,?,?,?)}";
//        DbConnection conn = null;
//        CallableStatement cs = null;
//
//        try {
//            conn = MySQLAccess.getInstance().getConn();
//            cs = conn.prepareCall(sql);
//            cs.registerOutParameter(1, Types.INTEGER);
//            cs.registerOutParameter(2, Types.VARCHAR);
//            cs.registerOutParameter(3, Types.VARCHAR);
//            cs.registerOutParameter(4, Types.INTEGER);
//            cs.registerOutParameter(5, Types.VARCHAR);
//            cs.setString(6, username);
//            cs.setString(7, password);
//            cs.registerOutParameter(8, Types.VARCHAR);
//            boolean kq = cs.execute();
//            if (!kq) {
//                int rc = cs.getInt(1);
//                String rd = cs.getString(2);
//                res.setRc(rc);
//                res.setRd(rd);
//                res.setDisplayName(cs.getString(3));
//                res.setRole(cs.getInt(4));
//                res.setList_role(cs.getString(5));
//                res.setPartnerId(cs.getString(8));
//                conn.commit();
//            } else {
//                res.setRc(-1);
//                res.setRd("Login failed !!!");
//                conn.rollback();
//            }
//        } catch (SQLException ex) {
//            res.setRc(-1);
//            res.setRd("Login failed !!!");
//            MySQLAccess.getInstance().rollback(conn);
//            logger.error("login info()==>{}", ex);
//        } finally {
//            MySQLAccess.getInstance().closeCallableStatement(cs);
//            MySQLAccess.getInstance().closeConn(conn);
//        }
//        return res;
//    }

    public void saveAdminAction(
            String username,
            String action,
            String actionResult,
            String actionDescription,
            String admindesc,
            String sIp,
            String osName,
            String browserName) {

        try {
            Document document = new Document();
            document.append("username", username);
            document.append("action", action);
            document.append("result", actionResult);
            document.append("description", actionDescription);
            document.append("admin_desc", admindesc);
            document.append("ip", sIp);
            document.append("os", osName);
            document.append("browser", browserName);
            document.append("time", System.currentTimeMillis());
            MongoDatabase db = MongoDbAccess.getInstance().getDb();
            MongoCollection<Document> coll = db.getCollection("creator_action");
            coll.insertOne(document);
        } catch (Exception ex) {
            logger.error("", ex);
        }

//        String sql = "{call proc_save_admin_action(?,?,?,?,?,?,?,?,?)}";
//        DbConnection conn = null;
//        CallableStatement cs = null;
//
//        try {
//            conn = MySQLAccess.getInstance().getConn();
//            cs = conn.prepareCall(sql);
//            cs.setString(1, java.util.UUID.randomUUID().toString());
//            cs.setString(2, username);
//            cs.setString(3, action);
//            cs.setString(4, actionResult);
//            cs.setString(5, actionDescription);
//            cs.setString(6, admindesc);
//            cs.setString(7, sIp);
//            cs.setString(8, osName);
//            cs.setString(9, browserName);
//            boolean kq = cs.execute();
//            if (!kq) {
//                conn.commit();
//                logger.info("save action of {} ok", username);
//            } else {
//                conn.rollback();
//                logger.info("save action {} failed", username);
//            }
//        } catch (SQLException ex) {
//            MySQLAccess.getInstance().rollback(conn);
//            logger.info("save action {} exception", username);
//            logger.error("login info()==> {}", ex);
//        } finally {
//            MySQLAccess.getInstance().closeCallableStatement(cs);
//            MySQLAccess.getInstance().closeConn(conn);
//        }
    }
    
//    public RespResult changePass(String username, String oldpass, String newpass) {
//        RespResult resp = new RespResult();
//        String sql = "{call proc_change_password(?,?,?,?,?)}";
//        CallableStatement cs = null;
//        DbConnection conn = null;
//        try {
//            conn = MySQLAccess.getInstance().getConn();
//            cs = conn.prepareCall(sql);
//            cs.setString(1, username);
//            cs.setString(2, oldpass);
//            cs.setString(3, newpass);
//            cs.registerOutParameter(4, Types.INTEGER);
//            cs.registerOutParameter(5, Types.VARCHAR);
//            boolean kq = cs.execute();
//            if (!kq) {
//                resp.setRc(cs.getInt(4));
//                resp.setRd(cs.getString(5));
//                conn.commit();
//            } else {
//                resp.setRc(-1);
//                resp.setRd("Action Failed");
//                conn.rollback();
//            }
//        } catch (SQLException e) {
//            resp.setRc(-1);
//            resp.setRd("Action Failed");
//            MySQLAccess.getInstance().rollback(conn);
//            logger.error("changePass info()==>{}", e);
//        } finally {
//            MySQLAccess.getInstance().closePreparedStatement(cs);
//            MySQLAccess.getInstance().closeConn(conn);
//        }
//        return resp;
//    }
    
}
