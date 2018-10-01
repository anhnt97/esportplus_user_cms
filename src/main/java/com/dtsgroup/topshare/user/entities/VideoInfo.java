package com.dtsgroup.topshare.user.entities;

public class VideoInfo {

    private int width;
    private int height;
    private int duration;

    public VideoInfo() {
        this.width = -1;
        this.height = -1;
        this.duration = 0;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    @Override
    public String toString() {
        return "VideoInfo{" +
                "width=" + width +
                ", height=" + height +
                ", duration=" + duration +
                '}';
    }
}
