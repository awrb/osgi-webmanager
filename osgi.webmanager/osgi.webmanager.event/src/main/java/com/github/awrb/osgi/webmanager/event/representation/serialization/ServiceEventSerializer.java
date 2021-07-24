package com.github.awrb.osgi.webmanager.event.representation.serialization;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.osgi.framework.ServiceEvent;

import java.io.IOException;

public class ServiceEventSerializer extends JsonSerializer<ServiceEvent> {

    @Override
    public void serialize(ServiceEvent serviceEvent, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("type", serviceEvent.getType());
        jsonGenerator.writeEndObject();
    }
}
