package com.github.awrb.osgi.webmanager.logs.representation.mixins;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.github.awrb.osgi.webmanager.logs.representation.serialization.LogEntrySerializer;

@JsonSerialize(using = LogEntrySerializer.class)
public abstract class LogEntryMixin {
}
