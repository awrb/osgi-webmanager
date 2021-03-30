package com.github.awrb.osgi.webmanager.bundle.representation.serialization;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.awrb.osgi.webmanager.bundle.representation.mixins.BundleMixin;
import org.osgi.framework.Bundle;

public class JsonMapper {

    private static ObjectMapper mapper;

    static {
        mapper = new ObjectMapper();
        mapper.addMixIn(Bundle.class, BundleMixin.class);
    }

    public static <T> JsonNode serialize(T object) {
        return mapper.valueToTree(object);
    }
}
