package com.github.awrb.osgi.webmanager.logs.representation.serialization;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;
import com.github.awrb.osgi.webmanager.logs.representation.mixins.LogEntryMixin;
import org.osgi.service.log.LogEntry;

import javax.ws.rs.core.Feature;
import javax.ws.rs.core.FeatureContext;

public class JacksonFeature implements Feature {

    private static final ObjectMapper mapper =
            new ObjectMapper() {{
                addMixIn(LogEntry.class, LogEntryMixin.class);
            }};

    private static final JacksonJaxbJsonProvider provider =
            new JacksonJaxbJsonProvider() {{
                setMapper(mapper);
            }};

    /**
     * This method is what actually gets called,
     * when your ResourceConfig registers a Feature.
     */
    @Override
    public boolean configure(FeatureContext context) {
        context.register(provider);
        return true;
    }
}
