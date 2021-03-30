package com.github.awrb.osgi.webmanager.serviceManagement.representation;

import com.github.awrb.osgi.webmanager.core.utils.OSGiPropertyConstants;
import org.osgi.framework.Bundle;
import org.osgi.framework.ServiceReference;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;

public class ServiceRepresentationFactory {

    public static ServiceRepresentation createServiceRepresentation(ServiceReference<?> reference) {
        Objects.requireNonNull(reference);

        List<Long> bundleIds = new ArrayList<>();

        if (reference.getUsingBundles() != null) {
            bundleIds = Stream.of(reference.getUsingBundles())
                    .map(Bundle::getBundleId)
                    .collect(toList());
        }

        Map<String, Object> properties = Stream.of(reference.getPropertyKeys())
                .collect(toMap(e -> e, reference::getProperty));

        return new ServiceRepresentation(
                (Long) (reference.getProperty(OSGiPropertyConstants.SERVICE_ID)),
                properties,
                reference.getBundle().getBundleId(),
                bundleIds);
    }
}
