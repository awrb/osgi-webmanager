package com.github.awrb.osgi.webmanager.configuration.representation;

import java.util.Map;

/**
 * This is a serialization-friendly representation of {@link org.osgi.service.cm.Configuration}.
 */
public class ConfigurationRepresentation {

    private String pid;
    private String bundleLocation;
    private long changeCount;
    private String factoryPid;
    private Map<String, Object> properties;


    public ConfigurationRepresentation(String pid, String bundleLocation, long changeCount, String factoryPid,
                                       Map<String, Object> properties) {
        this.pid = pid;
        this.bundleLocation = bundleLocation;
        this.changeCount = changeCount;
        this.factoryPid = factoryPid;
        this.properties = properties;
    }

    public String getPid() {
        return pid;
    }

    public String getBundleLocation() {
        return bundleLocation;
    }

    public long getChangeCount() {
        return changeCount;
    }

    public String getFactoryPid() {
        return factoryPid;
    }

    public Map<String, Object> getProperties() {
        return properties;
    }
}
