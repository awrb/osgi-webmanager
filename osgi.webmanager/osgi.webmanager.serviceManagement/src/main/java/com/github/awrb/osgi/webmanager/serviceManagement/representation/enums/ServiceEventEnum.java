package com.github.awrb.osgi.webmanager.serviceManagement.representation.enums;

import org.osgi.framework.ServiceEvent;

import java.util.HashMap;
import java.util.Map;

public enum ServiceEventEnum {

    MODIFIED(ServiceEvent.MODIFIED),
    MODIFIED_ENDMATCH(ServiceEvent.MODIFIED_ENDMATCH),
    REGISTERED(ServiceEvent.REGISTERED),
    UNREGISTERING(ServiceEvent.UNREGISTERING);

    private static final Map<Integer, ServiceEventEnum> lookup = new HashMap<>();

    static {
        for (ServiceEventEnum eventEnum : ServiceEventEnum.values()) {
            lookup.put(eventEnum.code, eventEnum);
        }
    }

    private int code;

    ServiceEventEnum(int code) {
        this.code = code;
    }

    /**
     * Gets a {@link ServiceEventEnum} corresponding to the code.
     *
     * @param code should be one of service event types as defined by integers in {@link ServiceEvent}
     * @return {@link ServiceEventEnum} corresponding to the code, or null if there is no enum mapped to the code
     */
    public static ServiceEventEnum get(int code) {
        return lookup.get(code);
    }
}
