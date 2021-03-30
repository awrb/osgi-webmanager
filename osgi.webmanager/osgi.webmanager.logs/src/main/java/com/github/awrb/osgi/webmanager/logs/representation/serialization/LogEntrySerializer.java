package com.github.awrb.osgi.webmanager.logs.representation.serialization;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.github.awrb.osgi.webmanager.core.utils.OSGiPropertyConstants;
import com.github.awrb.osgi.webmanager.core.utils.TimeConverter;
import com.github.awrb.osgi.webmanager.logs.representation.enums.LogLevelEnum;
import org.osgi.framework.Bundle;
import org.osgi.service.log.LogEntry;

import java.io.IOException;

public class LogEntrySerializer extends JsonSerializer<LogEntry> {
    @Override
    public void serialize(LogEntry logEntry, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        jsonGenerator.writeFieldName("bundle");
        jsonGenerator.writeStartObject();
        Bundle bundle = logEntry.getBundle();
        jsonGenerator.writeFieldName("bundleId");
        jsonGenerator.writeNumber(bundle.getBundleId());
        jsonGenerator.writeFieldName("name");
        jsonGenerator.writeString(bundle.getSymbolicName());
        jsonGenerator.writeEndObject();

        jsonGenerator.writeFieldName("message");
        jsonGenerator.writeString(logEntry.getMessage());

        jsonGenerator.writeFieldName("level");
        jsonGenerator.writeString(LogLevelEnum.get(logEntry.getLevel()).name());

        if (logEntry.getServiceReference() != null) {
            jsonGenerator.writeFieldName("serviceId");
            jsonGenerator.writeNumber((Long) logEntry.getServiceReference().getProperty(
                    OSGiPropertyConstants.SERVICE_ID));
        }

        jsonGenerator.writeFieldName("timestamp");
        jsonGenerator.writeString(TimeConverter.fromMiliseconds(logEntry.getTime()).toString());
        jsonGenerator.writeFieldName("exception");
        jsonGenerator.writeString(logEntry.getException() != null ? logEntry.getException().getMessage() : null);

        jsonGenerator.writeEndObject();
    }
}
