package com.github.awrb.osgi.webmanager.core.messaging;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component(service = ActiveMQConfiguration.class, immediate = true )
public class ActiveMQConfiguration {

    static final String URL = "url";
    static final String USERNAME = "username";
    static final String PASSWORD = "password";
    private static final String CFG_FILE_PATH = "etc/activemq.cfg";
    private Map<String, String> config;

    @Activate
    public void activate() {
        config = new HashMap<>();
        readConfiguration();
    }

    String getUrl() {
        return config.get(URL);
    }

    String getUsername() {
        return config.get(USERNAME);
    }

    String getPassword() {
        return config.get(PASSWORD);
    }

    private void readConfiguration() {
        File file = new File(CFG_FILE_PATH);
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] segments = line.split("=");
                String key = segments[0].trim();
                String value = segments[1].trim();
                config.put(key, value);
            }
        } catch (IOException e) {
            Logger.getGlobal().log(Level.SEVERE, e.toString());
        }
    }
}
