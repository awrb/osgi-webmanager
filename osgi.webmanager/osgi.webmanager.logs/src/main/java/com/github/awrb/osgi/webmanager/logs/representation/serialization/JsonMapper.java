package com.github.awrb.osgi.webmanager.logs.representation.serialization;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import com.github.awrb.osgi.webmanager.logs.representation.mixins.LogEntryMixin;
import org.osgi.service.log.LogEntry;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;

@Provider
public class JsonMapper extends JacksonJsonProvider {
    private static ObjectMapper mapper;

    static {
        mapper = new ObjectMapper();
        mapper.addMixIn(LogEntry.class, LogEntryMixin.class);
    }

    public static ObjectMapper getMapper() {
        return mapper;
    }

    public static <T> JsonNode serialize(T object) {
        return mapper.valueToTree(object);
    }
}
