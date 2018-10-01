/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PutForwardRequest;

import javax.servlet.annotation.WebServlet;

/**
 *
 * @author daua1993
 */
@WebServlet(name = "update-category", urlPatterns = {"/update-category"})
public class CategoryUpdateRequest extends PutForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/category";
    }

    @Override
    protected String getNoteAction() {
        return username + " Sửa danh mục";
    }
    

}
