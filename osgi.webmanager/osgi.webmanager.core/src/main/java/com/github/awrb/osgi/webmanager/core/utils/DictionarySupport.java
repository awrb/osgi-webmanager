package com.github.awrb.osgi.webmanager.core.utils;

import java.util.*;
import java.util.stream.Collectors;


public class DictionarySupport {
    public static <K, V> Map<K, V> toMap(Dictionary<K, V> dictionary) {
        List<K> keys = Collections.list(dictionary.keys());
        return keys.stream().collect(Collectors.toMap(e -> e, dictionary::get));
    }

    public static <K, V> Dictionary<K, V> valueOf(Map<K, V> map) {
        return new Hashtable<>(map);
    }
}
