/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.job;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.core.IConvertGifToMp4;
import com.dtsgroup.topshare.user.core.IVideoResolution;
import com.dtsgroup.topshare.user.core.bussiness.ConvertGifToMp4Ffmpeg;
import com.dtsgroup.topshare.user.core.bussiness.ConvertGifToMp4FfmpegPhanPC;
import com.dtsgroup.topshare.user.core.bussiness.GetVideoResolutionFfmpeg;
import com.dtsgroup.topshare.user.entities.VideoInfo;

/**
 * @author daua1993
 */
public class ConvertGifToMp4Process {

    private final String username;
    private final String inputFile;

    public ConvertGifToMp4Process(String username, String inputFile) {
        this.username = username;
        this.inputFile = inputFile;
    }

    public String convertToMp4() throws Exception {
        int processor = AppConfig.getConfig().getIntProperty("PROCESSOR", 1, "FFMPEG");
        IConvertGifToMp4 convertGifToMp4;
        if (processor != 1) {
            convertGifToMp4 = new ConvertGifToMp4Ffmpeg(this.username, this.inputFile);
        } else {
            convertGifToMp4 = new ConvertGifToMp4FfmpegPhanPC(this.username, this.inputFile);
        }
        return convertGifToMp4.convert();
    }

    public VideoInfo getResolution(String pathFile) {
        IVideoResolution resolution = new GetVideoResolutionFfmpeg();
        return resolution.getResolution(pathFile);
    }


}
