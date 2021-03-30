package com.github.awrb.osgi.webmanager.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;
import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;

//import com.github.awrb.osgi.webmanager.bundle.representation.mixins.BundleMixin;
//import com.github.awrb.osgi.webmanager.event.representation.mixins.EventMixin;
//import com.github.awrg.osgi.webmanager.logs.representation.mixins.LogEntryMixin;

import org.osgi.framework.Bundle;
import org.osgi.service.event.Event;
import org.osgi.service.log.LogEntry;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;

/**
 * This class configures a custom {@link JacksonJsonProvider}.
 */
@Provider
@Produces(MediaType.APPLICATION_JSON)
public class JsonProvider extends JacksonJaxbJsonProvider {

    private static final ObjectMapper mapper;

    static {
        mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    }

    public JsonProvider() {
        super();
        setMapper(mapper);
    }

    public static ObjectMapper getMapper() {
        return mapper;
    }

    public static void addMixin(Class<?> targetClazz, Class<?> mixinSourceClazz) {
        mapper.addMixIn(targetClazz, mixinSourceClazz);
    }
}
