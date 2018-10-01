package com.dtsgroup.topshare.user.db;


import com.dtsgroup.topshare.user.common.AppConfig;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoDatabase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;

public class MongoDbAccess {
    private final Logger logger = LoggerFactory.getLogger(MongoDbAccess.class.getSimpleName());
    private MongoDatabase db = null;

    private MongoDbAccess() {
        load();
    }

    private void load() {

        String host = AppConfig.getConfig().getProperty("HOST", "192.168.100.144", "MONGODB");
        int port = AppConfig.getConfig().getIntProperty("PORT", 27017, "MONGODB");
        String database = AppConfig.getConfig().getProperty("DB", "e4e", "MONGODB");
        String username = AppConfig.getConfig().getProperty("USERNAME", "e4e", "MONGODB");
        String password = AppConfig.getConfig().getProperty("PASSWORD", "xyz123", "MONGODB");
        logger.info("HOST " + host);
        try {
            MongoCredential credential = MongoCredential.createCredential(username, database, password.toCharArray());
            MongoClientOptions options = MongoClientOptions.builder().sslEnabled(false).build();
            MongoClient mongoClient = new MongoClient(new ServerAddress(host, port),
                    Arrays.asList(credential),
                    options);
            db = mongoClient.getDatabase(database);
        } catch (Exception ex) {
            db = null;
            logger.error("Exception:", ex);
        }
    }

    public static MongoDbAccess getInstance() {
        return MongoDbAccessHolder.INSTANCE;
    }

    private static class MongoDbAccessHolder {

        private static final MongoDbAccess INSTANCE = new MongoDbAccess();
    }

    public MongoDatabase getDb() throws Exception {
        if (db == null) {
            load();
        }
        return db;
    }

    public void close() {
        if (db != null) {
        }
    }
}
