package com.github.awrb.osgi.webmanager.configuration.representation;


/**
 * Used for creating configurations with {@link org.osgi.service.cm.ConfigurationAdmin}.
 */
public class ConfigurationCreation {

    private String factoryPid;
    private String location;

    public String getFactoryPid() {
        return factoryPid;
    }

    public void setFactoryPid(String factoryPid) {
        this.factoryPid = factoryPid;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
