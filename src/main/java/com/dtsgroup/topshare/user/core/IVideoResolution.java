package com.dtsgroup.topshare.user.core;

import com.dtsgroup.topshare.user.entities.VideoInfo;

public interface IVideoResolution {
    VideoInfo getResolution(String pathFile);
}
