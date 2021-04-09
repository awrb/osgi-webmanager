package com.github.awrb.osgi.webmanager.core.messaging;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class QueryProcessor {

    private static final String FIRST_PARAM_KEY = "_";
    private static final String PARAM_DELIMITER = "&";

    /**
     * Transforms:
     * alarm                         to {}
     * alarm_cat=meow&dog=woof       to {cat: "meow", dog: "woof"}
     */
    public static Map<String, String> toParams(String query) {
        final Map<String, String> result = new HashMap<>();

        if (query == null) {
            return result;
        }

        if (!query.contains(FIRST_PARAM_KEY)) {
            return result;
        }

        final String[] params = splitQuery(query);

        for (String param : params) {
            String[] split = param.split("=");
            if (split.length == 2) {
                result.put(split[0], split[1]);
            }
        }
        return result;
    }

    /**
     * Transforms:
     * items_id=123&    id=456&id=789    to [123, 456, 789]
     */
    public static Set<String> extractMultivaluedParameter(String query, String parameter) {
        Set<String> parameterValues = new HashSet<>();

        if (!query.contains(FIRST_PARAM_KEY)) {
            return parameterValues;
        }

        final String[] params = splitQuery(query);

        for (String param : params) {
            String[] split = param.split("=");
            if (split.length == 2 && split[0].equals(parameter)) {
                parameterValues.add(split[1]);
            }
        }
        return parameterValues;
    }

    private static String[] splitQuery(String query) {
        return query.substring(query.indexOf(FIRST_PARAM_KEY) + 1).split(PARAM_DELIMITER);
    }
}
