package com.github.awrb.osgi.webmanager.core.rest;

import com.github.awrb.osgi.webmanager.core.JsonProvider;

import javax.ws.rs.core.Feature;
import javax.ws.rs.core.FeatureContext;
import javax.ws.rs.ext.MessageBodyReader;
import javax.ws.rs.ext.MessageBodyWriter;

public class SerializationFeature implements Feature {

    @Override
    public boolean configure(FeatureContext context) {
        context.register(JsonProvider.class, MessageBodyReader.class, MessageBodyWriter.class);
        return true;
    }
}