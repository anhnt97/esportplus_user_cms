package com.dtsgroup.topshare.user.core.bussiness;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.core.IVideoResolution;
import com.dtsgroup.topshare.user.entities.VideoInfo;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.probe.FFmpegFormat;
import net.bramp.ffmpeg.probe.FFmpegProbeResult;
import net.bramp.ffmpeg.probe.FFmpegStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetVideoResolutionFfmpeg implements IVideoResolution {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public VideoInfo getResolution(String pathFile) {
        VideoInfo videoInfo = new VideoInfo();

        String ffmpegPath = AppConfig.getConfig().getProperty("FFMPEG_PATH", FFmpeg.DEFAULT_PATH, "SETTINGS");
        logger.info("==>file = {}", pathFile);
        logger.info("==>ffmpegPath = {}", ffmpegPath);
        FFprobe ffprobe;

        try {
            ffprobe = new FFprobe(ffmpegPath);
            FFmpegProbeResult probeResult = ffprobe.probe(pathFile);
            int duration = 0;
            int w = -1;
            int h = -1;
            if (probeResult != null) {

                FFmpegFormat format = probeResult.getFormat();
                if (format != null) {
                    duration = (int) format.duration;
                    logger.info("File: '{}' ; Format: '{}' ; Duration: {} fs",
                            format.filename,
                            format.format_long_name,
                            duration
                    );
                }
                FFmpegStream stream = probeResult.getStreams().get(0);

                if (stream != null) {
                    logger.info("Codec: '{}' ; Width: {} px ; Height: {} px",
                            stream.codec_long_name,
                            stream.width,
                            stream.height
                    );
                    w = stream.width;
                    h = stream.height;
                }
            }

            videoInfo.setDuration(duration);
            videoInfo.setWidth(w);
            videoInfo.setHeight(h);

        } catch (Exception e) {
            logger.error("Exception: ", e);
        }

        return videoInfo;
    }
}
