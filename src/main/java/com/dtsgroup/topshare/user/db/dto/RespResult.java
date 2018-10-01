/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.db.dto;

/**
 *
 * @author daua1993
 */
public class RespResult {

    protected int rc;
    protected String rd;

    private String desc;
    private Integer id;

    public RespResult() {
        this.rc = -1;
        this.rd = "failed";
        this.desc = null;
        this.id = null;
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

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "RespResult{" + "rc=" + rc + ", rd=" + rd + ", desc=" + desc + ", id=" + id + '}';
    }

}
