package com.github.awrb.osgi.webmanager.bundle.representation.enums;

import org.osgi.framework.Bundle;

import java.util.HashMap;
import java.util.Map;

public enum BundleStateEnum {

    UNINSTALLED(Bundle.UNINSTALLED),
    INSTALLED(Bundle.INSTALLED),
    ACTIVE(Bundle.ACTIVE),
    RESOLVED(Bundle.RESOLVED),
    STARTING(Bundle.STARTING),
    STOPPING(Bundle.STOPPING),
    ALL(Constants.ALL_BUNDLES);

    private static final Map<Integer, BundleStateEnum> lookup = new HashMap<>();

    static {
        for (BundleStateEnum stateEnum : BundleStateEnum.values()) {
            lookup.put(stateEnum.code, stateEnum);
        }
    }

    private int code;

    BundleStateEnum(int code) {
        this.code = code;
    }

    /**
     * Gets a {@link BundleStateEnum} corresponding to the code.
     *
     * @param code should be one of bundle states as defined by integers in {@link Bundle}
     * @return {@link BundleStateEnum} corresponding to the code, or null if there is no enum mapped to the code
     */
    public static BundleStateEnum get(int code) {
        return lookup.get(code);
    }

    public String getState() {
        return this.name();
    }

    private static class Constants {
        private static final int ALL_BUNDLES = 0;
    }
}
