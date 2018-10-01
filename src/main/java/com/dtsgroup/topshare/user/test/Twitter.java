package com.dtsgroup.topshare.user.test;

import com.dtsgroup.topshare.user.utils.HttpUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.auth.RequestToken;
import twitter4j.conf.ConfigurationBuilder;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Twitter {

    public static void main(String[] args) throws IOException, ParseException {
        Twitter twitter = new Twitter();
        twitter.request();
    }

    private void request() throws IOException, ParseException {
        String url = "https://api.twitter.com/oauth/request_token";
        String callback = "https://creator.topshare.live/twitter_auth_callback.jsp";
        Map<String, String> headers = new HashMap<>();
        headers.put("oauth_callback", callback);
        headers.put("oauth_consumer_key", "UFWUhLAnvQLiTJUwQANLpDQax");
        JSONObject jsonObject = HttpUtils.post(url, new JSONObject(), headers);
        System.out.println(jsonObject.toJSONString());

        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setDebugEnabled(true)
                .setOAuthConsumerKey("UFWUhLAnvQLiTJUwQANLpDQax")
                .setOAuthConsumerSecret("vEpUhTD1RKSBU3U5oHKkNMME28Ltka6P3N13hzMdnZUSEaoRn8");
        TwitterFactory tf = new TwitterFactory(cb.build());
        twitter4j.Twitter twitter = tf.getInstance();

        try {

            // setup callback URL
//            StringBuffer callbackURL = callback;
//            int index = callbackURL.lastIndexOf("/");
//            callbackURL.replace(index, callbackURL.length(), "").append("/callback");

            // get request object and save to session
            RequestToken requestToken = twitter.getOAuthRequestToken(callback);
//            request.getSession().setAttribute("requestToken", requestToken);

            // redirect to twitter authentication URL
//            response.sendRedirect(requestToken.getAuthenticationURL());

            System.out.println(requestToken.getAuthenticationURL());

        } catch (TwitterException e) {
            e.printStackTrace();
        }
    }
}
