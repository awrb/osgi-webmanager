package com.github.awrb.osgi.webmanager.core.utils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class TimeConverter {

    public static LocalDateTime fromMiliseconds(long milis) {
        Instant instant = Instant.ofEpochMilli(milis);
        return instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
    }
}
