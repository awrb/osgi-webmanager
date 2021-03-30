package com.github.awrb.osgi.webmanager.logs.representation.enums;

import java.util.HashMap;
import java.util.Map;

/**
 * This is based on log levels defined as final integers in {@link org.osgi.service.log.LogService}.
 */
public enum LogLevelEnum {

    LOG_ERROR(1),
    LOG_WARNING(2),
    LOG_INFO(3),
    LOG_DEBUG(4),

    /**
     * Special value that corresponds to all log types when retrieving the logs,
     * not for use when creating new logs
     */
    ALL(5);

    private static final Map<LogLevelEnum, Integer> lookup = new HashMap<>();
    private static final Map<Integer, LogLevelEnum> reverseLookup = new HashMap<>();

    static {
        for (LogLevelEnum logLevelEnum : LogLevelEnum.values()) {
            lookup.put(logLevelEnum, logLevelEnum.code);
            reverseLookup.put(logLevelEnum.code, logLevelEnum);
        }
    }

    private int code;

    LogLevelEnum(int code) {
        this.code = code;
    }

    /**
     * Gets an integer level corresponding to the {@link LogLevelEnum}.
     *
     * @param logLevelEnum {@link LogLevelEnum} corresponding to the log level
     *                     defined by integers in {@link org.osgi.service.log.LogService}
     * @return level as int corresponding to the enum, or level 3 INFO as default
     */
    public static int get(LogLevelEnum logLevelEnum) {
        return lookup.getOrDefault(logLevelEnum, LOG_INFO.code);
    }

    /**
     * Gets {@link LogLevelEnum} corresponding to the int code.
     *
     * @param code code of the level, as defined by constants in {@link org.osgi.service.log.LogService}
     * @return returns the enum corresponding to the code, or LOG_INFO as default
     */
    public static LogLevelEnum get(int code) {
        return reverseLookup.getOrDefault(code, LOG_INFO);
    }
}
