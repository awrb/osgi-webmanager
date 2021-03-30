package com.github.awrb.osgi.webmanager.logs.representation;

import com.github.awrb.osgi.webmanager.logs.representation.enums.LogLevelEnum;

/**
 * This represents a message that should be logged with a certain log level.
 */
public class LogPublicationRequest {

    private LogLevelEnum level;
    private String message;

    public LogLevelEnum getLevel() {
        return level;
    }

    public void setLevel(LogLevelEnum level) {
        this.level = level;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "LogPublicationRequest{" +
                "level=" + level +
                ", message='" + message + '\'' +
                '}';
    }
}
