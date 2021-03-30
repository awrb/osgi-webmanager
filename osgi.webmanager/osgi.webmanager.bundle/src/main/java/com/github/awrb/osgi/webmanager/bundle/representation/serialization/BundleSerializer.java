package com.github.awrb.osgi.webmanager.bundle.representation.serialization;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.osgi.framework.Bundle;

import java.io.IOException;

public class BundleSerializer extends JsonSerializer<Bundle> {
    @Override
    public void serialize(Bundle bundle, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeFieldName("bundleId");
        jsonGenerator.writeNumber(bundle.getBundleId());
        jsonGenerator.writeFieldName("name");
        jsonGenerator.writeString(bundle.getSymbolicName());
        jsonGenerator.writeEndObject();
    }
}
