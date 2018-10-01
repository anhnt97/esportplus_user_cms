package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "update-profile", urlPatterns = {"/update-profile"})
public class UpdateProfileRequest extends PostForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/user/update-profile";
    }

    @Override
    protected String getNoteAction() {
        return username + " Update Profile";
    }

}
