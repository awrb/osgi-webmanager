package com.github.awrb.osgi.webmanager.bundle.representation;

import com.github.awrb.osgi.webmanager.bundle.representation.enums.BundleStateEnum;
import org.osgi.framework.Constants;

import java.util.Map;

/**
 * This is a serialization-friendly representation of a {@link org.osgi.framework.Bundle}.
 */
public class BundleRepresentation {

    private Map<String, String> headers;
    private long id;
    private String lastModified;
    private String symbolicName;
    private String version;
    private String location;
    private String description;
    private String name;
    private BundleStateEnum state;
    private int startLevel;

    public BundleRepresentation(Map<String, String> headers, long id, String lastModified, String symbolicName,
                                String version, String location, int state, int startLevel) {
        this.headers = headers;
        this.id = id;
        this.lastModified = lastModified;
        this.symbolicName = symbolicName;
        this.version = version;
        this.location = location;
        this.state = BundleStateEnum.get(state);
        this.name = headers.get(Constants.BUNDLE_NAME);
        this.description = headers.get(Constants.BUNDLE_DESCRIPTION);
        this.startLevel = startLevel;
    }

    public BundleRepresentation() {
    }

    public Map<String, String> getHeaders() {
        return headers;
    }

    public long getId() {
        return id;
    }

    public String getLastModified() {
        return lastModified;
    }

    public String getSymbolicName() {
        return symbolicName;
    }

    public String getVersion() {
        return version;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public BundleStateEnum getState() {
        return state;
    }

    public int getStartLevel() {
        return startLevel;
    }

    @Override
    public String toString() {
        return "BundleRepresentation{" +
                "headers=" + headers +
                ", id=" + id +
                ", lastModified='" + lastModified + '\'' +
                ", symbolicName='" + symbolicName + '\'' +
                ", version='" + version + '\'' +
                ", location='" + location + '\'' +
                ", description='" + description + '\'' +
                ", name='" + name + '\'' +
                ", state=" + state +
                ", startLevel=" + startLevel +
                '}';
    }
}
