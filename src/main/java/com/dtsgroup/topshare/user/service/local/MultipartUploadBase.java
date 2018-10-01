package com.dtsgroup.topshare.user.service.local;

import com.dtsgroup.topshare.user.service.PostBaseRequest;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@MultipartConfig
public abstract class MultipartUploadBase extends PostBaseRequest {

    protected final List<FileItem> files = new ArrayList<>();

    @Override
    protected Map<String, String> getParams(HttpServletRequest request) throws UnsupportedEncodingException {
        Map<String, String> p = new HashMap<>();
        files.clear();
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        try {
            if (isMultipart) {
                FileItemFactory factory = new DiskFileItemFactory();
                ServletFileUpload upload = new ServletFileUpload(factory);
                List<FileItem> items = upload.parseRequest(request);
                for (FileItem item : items) {
                    if (!item.isFormField()) {
                        files.add(item);
                    } else {
                        String field = item.getFieldName();
                        String value = item.getString("UTF-8");
                        p.put(field, value);
                    }
                }
            }
        } catch (UnsupportedEncodingException | FileUploadException ex) {
            logger.error("Exception: ", ex);
        }
        return p;
    }

    protected int deleteFile(String filePath) {
        try {
            File file = new File(filePath);
            return deleteFile(file);
        } catch (Exception e) {
            logger.error("", e);
        }
        return -1;
    }

    protected int deleteFile(File file) {
        try {
            if (file != null) {
                if (file.delete()) {
                    logger.info(file.getName() + " deleted");
                    return 0;
                } else {
                    logger.info("Delete file {} failed.", file.getName());
                    return 1;
                }
            }
        } catch (Exception e) {
            logger.error("", e);
        }
        return -1;
    }

}
