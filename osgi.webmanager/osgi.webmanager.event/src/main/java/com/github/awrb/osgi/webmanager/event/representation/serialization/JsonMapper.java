package com.github.awrb.osgi.webmanager.event.representation.serialization;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.github.awrb.osgi.webmanager.bundle.representation.mixins.BundleMixin;
import com.github.awrb.osgi.webmanager.event.representation.mixins.EventMixin;
import com.github.awrb.osgi.webmanager.event.representation.mixins.ServiceEventMixin;
import com.github.awrb.osgi.webmanager.event.representation.mixins.ServiceReferenceMixin;
import com.github.awrb.osgi.webmanager.logs.representation.mixins.LogEntryMixin;
import org.osgi.framework.Bundle;
import org.osgi.framework.ServiceEvent;
import org.osgi.framework.ServiceReference;
import org.osgi.service.event.Event;
import org.osgi.service.log.LogEntry;

public class JsonMapper {

    private static ObjectMapper mapper;

    static {
        mapper = new ObjectMapper();
        mapper.addMixIn(Bundle.class, BundleMixin.class);
        mapper.addMixIn(LogEntry.class, LogEntryMixin.class);
        mapper.addMixIn(ServiceReference.class, ServiceReferenceMixin.class);
        mapper.addMixIn(ServiceEvent.class, ServiceEventMixin.class);
        mapper.addMixIn(Event.class, EventMixin.class);
    }

    public static <T> JsonNode serialize(T object) {
        try {
            return mapper.valueToTree(object);
        } catch (Exception e) {
            return JsonNodeFactory.instance.nullNode();
        }
    }
}
