package com.dtsgroup.topshare.user.service.forward;

import com.dtsgroup.topshare.user.service.PutForwardRequest;

import javax.servlet.annotation.WebServlet;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "content-youtube-update", urlPatterns = {"/content-youtube-update"})
public class UpdateContentYouTubeRequest extends PutForwardRequest {

    @Override
    public String getRequestUrl() {
        return baseUrl() + "/post";
    }

    @Override
    protected String getNoteAction() {
        return "Admin " + username + " cập nhât 1 bài viết";
    }

    @Override
    protected Map<String, String> fieldsUnsave() {
        Map<String, String> fields = new HashMap<>();
        fields.put("thumb", "too long, cannot print");
        return fields;
    }

}
