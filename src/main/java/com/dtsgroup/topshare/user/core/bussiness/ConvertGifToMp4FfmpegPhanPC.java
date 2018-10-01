package com.dtsgroup.topshare.user.core.bussiness;

import com.dtsgroup.topshare.user.common.AppConfig;
import com.dtsgroup.topshare.user.core.IConvertGifToMp4;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;

public class ConvertGifToMp4FfmpegPhanPC extends IConvertGifToMp4 {

    public ConvertGifToMp4FfmpegPhanPC(String username, String inputFile) {
        super(username, inputFile);
    }

    @Override
    public String convert() throws Exception {
        FFmpeg ffmpeg = new FFmpeg(FFmpeg.DEFAULT_PATH);
        FFprobe ffprobe = new FFprobe(FFmpeg.DEFAULT_PATH);
        String output = buildOutputName();
        String crf = AppConfig.getConfig().getProperty("CRF", "35", "FFMPEG");

        //ffmpeg -i image.gif -c:v libx264  -profile:v high -level:v 3.0 -crf 35 -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -b:v 320K image.mp4
        logger.info("FFMPEG Command: ffmpeg -i " + inputFile + " -movflags faststart -c:v libx264  -profile:v high -level:v 3.0 -crf " + crf + " -pix_fmt yuv420p -vf \"scale=trunc(iw/2)*2:trunc(ih/2)*2\" -b:v 320K " + output);
        System.out.println("FFMPEG Command: ffmpeg -i " + inputFile + " -movflags faststart -c:v libx264  -profile:v high -level:v 3.0 -crf " + crf + " -pix_fmt yuv420p -vf \"scale=trunc(iw/2)*2:trunc(ih/2)*2\" -b:v 320K " + output);
        FFmpegBuilder builder = new FFmpegBuilder()
                .setInput(this.inputFile)
                .addOutput(output)
                .setVideoMovFlags("faststart")
                .addExtraArgs("-c:v", "libx264", "-profile:v", "high", "-level:v", "3.0", "-crf", crf, "-pix_fmt", "yuv420p", "-b:v", "320K")
                .setVideoFilter("scale=trunc(iw/2)*2:trunc(ih/2)*2")
                .done();

        FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);
        executor.createJob(builder).run();
        logger.info("FFMPEG convert and save file {} success", output);

        return output;
    }
}
