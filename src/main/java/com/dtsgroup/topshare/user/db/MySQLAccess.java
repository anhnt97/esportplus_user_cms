package com.dtsgroup.topshare.user.db;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.common.AppLogger;
import com.dtsgroup.topshare.user.common.Constant;
import com.kiemanh.vn.DbConnection;
import com.kiemanh.vn.DbConnectionPool;
import org.jconfig.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.logging.Level;

public class MySQLAccess {

    private Logger logger = null;
    private static MySQLAccess instance = null;
    private DbConnectionPool db_pool;
    private static boolean reload = false;
    private boolean isAutoCommit = false;
    private final String line1 = "\n";

    private static class CFG_DB {

        private static String DRIVER = "com.mysql.jdbc.Driver";
        private static String CONNECT_STRING = "jdbc:mysql://127.0.0.1:3306/cardp2admin?zeroDateTimeBehavior=convertToNull?characterEncoding=UTF-8";
        private static String USER_NAME = "cardp2admin";
        private static String PASSWORD = "Dtsgroup@123";
        private static int MAX_CONNECTION = 16;
    }

    public MySQLAccess() {
        logger = LoggerFactory.getLogger(Constant.LOGGER_NAME);
        load(); 
    }

    public String getContent() {
        String GENERATE_CONTENT = "[DB]"
                + line1
                + "\t driver = "
                + MySQLAccess.CFG_DB.DRIVER
                + line1
                + "\t connect_string = "
                + MySQLAccess.CFG_DB.CONNECT_STRING
                + line1
                + "\t # Oracle RAC -> connect_string = jdbc:oracle:thin:@(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.2.92)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.2.94)(PORT = 1521))  (CONNECT_DATA = (SERVICE_NAME = vlive))  )"
                + line1 + "\t username = " + MySQLAccess.CFG_DB.USER_NAME
                + line1 + "\t password = " + MySQLAccess.CFG_DB.PASSWORD
                + line1 + "\t max_connection = "
                + MySQLAccess.CFG_DB.MAX_CONNECTION + line1;
        return GENERATE_CONTENT;
    }

    private void load() {
        Configuration config = AppConfig.getConfig();
        String driver = "com.mysql.jdbc.Driver";
        String connect_string = config.getProperty("URL", null, "MYSQL");
        String username = config.getProperty("USERNAME", null, "MYSQL");
        String password = config.getProperty("PASSWORD", null, "MYSQL");
        isAutoCommit = config.getBooleanProperty("AUTO_COMMIT", false, "MYSQL");
        int max_connection = config.getIntProperty("MAX_LIMIT", 3, "MYSQL");
        boolean changed = false;
        changed |= !MySQLAccess.CFG_DB.DRIVER.equals(driver);
        changed |= !MySQLAccess.CFG_DB.CONNECT_STRING.equals(connect_string);
        changed |= !MySQLAccess.CFG_DB.USER_NAME.equals(username);
        changed |= !MySQLAccess.CFG_DB.PASSWORD.equals(password);
        changed |= MySQLAccess.CFG_DB.MAX_CONNECTION != max_connection;
        if (changed) {
            MySQLAccess.CFG_DB.DRIVER = driver;
            MySQLAccess.CFG_DB.CONNECT_STRING = connect_string;
            MySQLAccess.CFG_DB.USER_NAME = username;
            MySQLAccess.CFG_DB.PASSWORD = password;
            MySQLAccess.CFG_DB.MAX_CONNECTION = max_connection;

            if (db_pool != null) {
                if (logger.isWarnEnabled()) {
                    logger.warn("The db config was changed. Restart all connections");
                }
                try {
                    db_pool.destroy(30000L);
                } catch (SQLException ex) {
                    if (logger.isWarnEnabled()) {
                        logger.warn("Error while destroy db pool -- ", ex);
                    }
                }
            }

            db_pool = new DbConnectionPool(logger, driver, connect_string,
                    username, password, max_connection,
                    new DbConnectionRefactoryImpl());
        }
    }

    public synchronized static MySQLAccess getInstance() {
        if (reload) {
            instance = new MySQLAccess();
            reload = false;
        } else if (instance == null) {
            instance = new MySQLAccess();
        }
        return instance;
    }

    public DbConnection getConn() throws SQLException {
        DbConnection conn = null;
        if (db_pool == null) {
            load();
        }
        try {
            conn = db_pool.getConnection();
            conn.setAutoCommit(isAutoCommit);
        } catch (InterruptedException | SQLException ex) {
            java.util.logging.Logger.getLogger(MySQLAccess.class.getName()).log(Level.SEVERE, null, ex);
            AppLogger.getLogger().debug("====>getConn() " + ex);
        }
        if (conn == null) {
            throw new SQLException("Connection is not established");
        }
        conn.commit();
        return conn;
    }

    public void closeConn(DbConnection conn) {
        if (conn != null) {
            db_pool.freeConnection(conn);
        }
    }

    public void closePreparedStatement(PreparedStatement ps) {
        if (ps != null) {
            try {
                ps.close();
            } catch (Exception e) {
                logger.error("Database ==>" + e);
            }
        }
    }

    public void closeCallableStatement(CallableStatement cs) {
        if (cs != null) {
            try {
                cs.close();
            } catch (Exception e) {
                logger.error("Database ==>" + e);
            }
        }
    }

    public void closeResultSet(ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                logger.error("Database ==>" + e);
            }
        }
    }

    public void closeStatement(Statement stmt) {
        if (stmt != null) {
            try {
                stmt.close();
            } catch (Exception e) {
                logger.error("Database ==>" + e);
            }
        }
    }

    public boolean isConnected() {
        // Tam thoi de the nay da;
        return true;
    }

    public void destroy() {
        if (db_pool != null) {
            try {
                db_pool.destroy();
                db_pool = null;
            } catch (Exception e) {
            }
        }
    }

    public void commit(DbConnection conn) {
        if (conn != null) {
            try {
                conn.commit();
            } catch (Exception e) {
            }

        }
    }

    public void rollback(DbConnection conn) {
        if (conn != null) {
            try {
                conn.rollback();
            } catch (Exception e) {
            }

        }
    }
}
