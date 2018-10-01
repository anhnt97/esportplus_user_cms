/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.db;

import com.kiemanh.vn.DbConnection;
import com.kiemanh.vn.DbConnectionRefactory;

import java.sql.SQLException;

//------------------------------------------------------------------------------
public class DbConnectionRefactoryImpl implements DbConnectionRefactory {

//------------------------------------------------------------------------------
    public DbConnectionRefactoryImpl() {
    }

//------------------------------------------------------------------------------
    @Override
    public DbConnection refactory(int index, DbConnection conn) throws SQLException {
        return new DbImpl(index, conn); 
    }
}