/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.db.dto;

import com.dtsgroup.topshare.user.common.UserRole;

/**
 *
 * @author daua1993
 */
public class LoginResult {
    private int rc;
    private String rd;
    private String displayName;
    private int role;
    private String list_role;
    private String partnerId;

    public LoginResult() {
        rc = -1;
        rd = null;
        displayName = null;
        role = UserRole.VIEWER;
        list_role = null;
        this.partnerId = "";
    }

    public int getRc() {
        return rc;
    }

    public void setRc(int rc) {
        this.rc = rc;
    }

    public String getRd() {
        return rd;
    }

    public void setRd(String rd) {
        this.rd = rd;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public String getList_role() {
        return list_role;
    }

    public void setList_role(String list_role) {
        this.list_role = list_role;
    }

    public String getPartnerId() {
        return partnerId;
    }

    public void setPartnerId(String partnerId) {
        this.partnerId = partnerId;
    }

}
