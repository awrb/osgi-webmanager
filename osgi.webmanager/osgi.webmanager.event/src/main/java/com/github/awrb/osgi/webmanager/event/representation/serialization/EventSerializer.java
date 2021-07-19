package com.github.awrb.osgi.webmanager.event.representation.serialization;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.github.awrb.osgi.webmanager.core.utils.OSGiPropertyConstants;
import com.github.awrb.osgi.webmanager.core.utils.TimeConverter;
import org.osgi.service.event.Event;

import java.io.IOException;

public class EventSerializer extends JsonSerializer<Event> {

    @Override
    public void serialize(Event event, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeFieldName("topic");
        jsonGenerator.writeString(event.getTopic());

        jsonGenerator.writeObjectFieldStart("properties");
        String[] propertyNames = event.getPropertyNames();

        for (String propertyName : propertyNames) {
            jsonGenerator.writeFieldName(propertyName);

            if (propertyName.equals(OSGiPropertyConstants.TIMESTAMP)) {
                jsonGenerator.writeString(TimeConverter.fromMiliseconds(
                        (Long) event.getProperty(propertyName))
                        .toString());
            } else {
                jsonGenerator.writeObject(event.getProperty(propertyName));
            }

        }
        jsonGenerator.writeEndObject();

        jsonGenerator.writeEndObject();
    }
}
