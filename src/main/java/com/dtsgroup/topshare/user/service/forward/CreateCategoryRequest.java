/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;

/**
 *
 * @author daua1993
 */
@WebServlet(name = "create-category", urlPatterns = {"/create-category"})
public class CreateCategoryRequest extends PostForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/category";
    }

    @Override
    protected String getNoteAction() {
        return "Admin " + username + " tạo 1 danh mục";
    }

}
