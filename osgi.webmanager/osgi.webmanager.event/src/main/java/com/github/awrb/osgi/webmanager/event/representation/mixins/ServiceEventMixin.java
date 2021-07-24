package com.github.awrb.osgi.webmanager.event.representation.mixins;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.github.awrb.osgi.webmanager.event.representation.serialization.ServiceEventSerializer;

@JsonSerialize(using = ServiceEventSerializer.class)
public interface ServiceEventMixin {
}
