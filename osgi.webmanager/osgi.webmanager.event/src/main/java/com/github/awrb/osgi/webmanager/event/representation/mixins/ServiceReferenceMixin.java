package com.github.awrb.osgi.webmanager.event.representation.mixins;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.github.awrb.osgi.webmanager.event.representation.serialization.ServiceReferenceSerializer;

@JsonSerialize(using = ServiceReferenceSerializer.class)
public interface ServiceReferenceMixin {
}
