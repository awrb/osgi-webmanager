package com.github.awrb.osgi.webmanager.bundle.representation.enums;

import org.osgi.framework.BundleEvent;

import java.util.HashMap;
import java.util.Map;

public enum BundleEventEnum {

    INSTALLED(BundleEvent.INSTALLED),
    LAZY_ACTIVATION(BundleEvent.LAZY_ACTIVATION),
    RESOLVED(BundleEvent.RESOLVED),
    STARTED(BundleEvent.STARTED),
    STARTING(BundleEvent.STARTING),
    STOPPED(BundleEvent.STOPPED),
    STOPPING(BundleEvent.STOPPING),
    UNINSTALLED(BundleEvent.UNINSTALLED),
    UNRESOLVED(BundleEvent.UNRESOLVED),
    UPDATED(BundleEvent.UPDATED);

    private static final Map<Integer, BundleEventEnum> lookup = new HashMap<>();

    static {
        for (BundleEventEnum eventEnum : BundleEventEnum.values()) {
            lookup.put(eventEnum.code, eventEnum);
        }
    }

    private int code;

    BundleEventEnum(int code) {
        this.code = code;
    }

    /**
     * Gets a {@link BundleEventEnum} corresponding to the code.
     *
     * @param code should be one of bundle event types as defined by integers in {@link BundleEvent}
     * @return {@link BundleEventEnum} corresponding to the code, or null if there is no enum mapped to the code
     */
    public static BundleEventEnum get(int code) {
        return lookup.get(code);
    }
}

