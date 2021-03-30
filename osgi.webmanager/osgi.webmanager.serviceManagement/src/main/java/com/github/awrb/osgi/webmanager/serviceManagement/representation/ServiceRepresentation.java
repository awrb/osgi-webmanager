package com.github.awrb.osgi.webmanager.serviceManagement.representation;

import java.util.List;
import java.util.Map;

public class ServiceRepresentation {

    private long id;
    private Map<String, Object> properties;
    private long bundleId;
    private List<Long> usingBundles;

    public ServiceRepresentation(long id, Map<String, Object> properties, long bundleId, List<Long> usingBundles) {
        this.id = id;
        this.properties = properties;
        this.bundleId = bundleId;
        this.usingBundles = usingBundles;
    }

    public long getId() {
        return id;
    }

    public Map<String, Object> getProperties() {
        return properties;
    }

    public long getBundleId() {
        return bundleId;
    }

    public List<Long> getUsingBundles() {
        return usingBundles;
    }
}
