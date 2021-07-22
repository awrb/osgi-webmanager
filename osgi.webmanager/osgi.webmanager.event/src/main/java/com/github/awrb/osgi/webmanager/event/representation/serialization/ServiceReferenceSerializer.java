package com.github.awrb.osgi.webmanager.event.representation.serialization;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.osgi.framework.ServiceEvent;
import org.osgi.framework.ServiceReference;

import java.io.IOException;

public class ServiceReferenceSerializer extends JsonSerializer<ServiceReference<?>> {

    @Override
    public void serialize(ServiceReference<?> reference, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("bundle", reference.getBundle().getSymbolicName());

        for (String propertyKey : reference.getPropertyKeys()) {
            Object property = reference.getProperty(propertyKey);
            if (!(property instanceof ServiceReference) && !(property instanceof ServiceEvent)) {
                jsonGenerator.writeObjectField(propertyKey, property);
            }
        }

        jsonGenerator.writeEndObject();
    }
}
