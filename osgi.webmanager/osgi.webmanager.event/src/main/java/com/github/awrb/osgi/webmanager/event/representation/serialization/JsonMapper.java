package com.github.awrb.osgi.webmanager.event.representation.serialization;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.awrb.osgi.webmanager.event.representation.mixins.EventMixin;
import org.osgi.service.event.Event;

public class JsonMapper {

    private static ObjectMapper mapper;

    static {
        mapper = new ObjectMapper();
        mapper.addMixIn(Event.class, EventMixin.class);
    }

    public static <T> JsonNode serialize(T object) {
        return mapper.valueToTree(object);
    }
}
