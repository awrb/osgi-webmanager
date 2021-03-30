package com.github.awrb.osgi.webmanager.event.representation;

import java.util.Map;

public class EventPublicationRequest {

    private String topic;
    private Map<String, Object> properties;
    private boolean asynchronous;

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Map<String, Object> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }

    public boolean isAsynchronous() {
        return asynchronous;
    }

    public void setAsynchronous(boolean asynchronous) {
        this.asynchronous = asynchronous;
    }

    @Override
    public String toString() {
        return "EventPublicationRequest{" +
                "topic='" + topic + '\'' +
                ", properties=" + properties +
                ", asynchronous=" + asynchronous +
                '}';
    }
}
