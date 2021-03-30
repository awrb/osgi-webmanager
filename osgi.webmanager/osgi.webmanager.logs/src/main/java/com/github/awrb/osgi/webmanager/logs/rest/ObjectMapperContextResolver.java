package com.github.awrb.osgi.webmanager.logs.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.awrb.osgi.webmanager.logs.representation.serialization.JsonMapper;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

@Provider
@Produces(MediaType.APPLICATION_JSON)
public class ObjectMapperContextResolver implements ContextResolver<ObjectMapper> {

    @Override
    public ObjectMapper getContext(Class<?> aClass) {
        return JsonMapper.getMapper();
    }
}
