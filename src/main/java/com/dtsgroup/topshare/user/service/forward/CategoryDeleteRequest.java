/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.DeleteForwardRequest;

import javax.servlet.annotation.WebServlet;

/**
 *
 * @author daua1993
 */
@WebServlet(name = "delete-category", urlPatterns = {"/delete-category"})
public class CategoryDeleteRequest extends DeleteForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/category";
    }

    @Override
    protected String getNoteAction() {
        return "Xóa danh mục";
    }

}
