package com.github.awrb.osgi.webmanager.event.representation.serialization;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.osgi.framework.Bundle;
import org.osgi.framework.ServiceReference;

import java.io.IOException;

public class ServiceReferenceSerializer extends JsonSerializer<ServiceReference<?>> {

    @Override
    public void serialize(ServiceReference<?> reference, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        Bundle bundle = reference.getBundle();
        if (bundle != null) {
            jsonGenerator.writeStringField("bundle", bundle.getSymbolicName());

        }

        jsonGenerator.writeEndObject();
    }
}
