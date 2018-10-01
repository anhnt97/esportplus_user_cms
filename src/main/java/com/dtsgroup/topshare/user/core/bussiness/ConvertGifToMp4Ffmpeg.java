package com.dtsgroup.topshare.user.core.bussiness;

import com.dtsgroup.topshare.user.core.IConvertGifToMp4;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;

public class ConvertGifToMp4Ffmpeg extends IConvertGifToMp4 {

    public ConvertGifToMp4Ffmpeg(String username, String inputFile) {
        super(username, inputFile);
    }

    @Override
    public String convert() throws Exception {
        FFmpeg ffmpeg = new FFmpeg(FFmpeg.DEFAULT_PATH);
        FFprobe ffprobe = new FFprobe(FFmpeg.DEFAULT_PATH);
        String output = buildOutputName();
        //ffmpeg -i Blurp_burble_Yay_bubbles.gif -pix_fmt yuv420p -c:v libx264 -movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" dautv_12334.mp4
        //ffmpeg -f gif -i source.gif -pix_fmt yuv420p -c:v libx264 -movflags +faststart BAR.mp4
        logger.info("FFMPEG Command: ffmpeg -i " + inputFile + " -pix_fmt yuv420p -c:v libx264 -movflags +faststart -vf \"scale=trunc(iw/2)*2:trunc(ih/2)*2\" " + output);
        System.out.println("FFMPEG Command: ffmpeg -i " + inputFile + " -pix_fmt yuv420p -c:v libx264 -movflags +faststart -vf \"scale=trunc(iw/2)*2:trunc(ih/2)*2\" " + output);
        FFmpegBuilder builder = new FFmpegBuilder()
                .setInput(this.inputFile)
                .addOutput(output)
                .addExtraArgs("-movflags", "+faststart", "-pix_fmt", "yuv420p", "-c:v", "libx264")
                .setVideoFilter("scale=trunc(iw/2)*2:trunc(ih/2)*2")
                .done();
        FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);
        executor.createJob(builder).run();
        logger.info("FFMPEG convert and save file {} success", output);
        return output;
    }

}
