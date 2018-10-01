package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PostForwardRequest;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "upload-image", urlPatterns = {"/upload-image"})
public class UploadImageRequest extends PostForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/upload/image";
    }

    @Override
    public boolean storageAction() {
        return false;
    }

}
