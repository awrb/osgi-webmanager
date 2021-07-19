package com.github.awrb.osgi.webmanager.serviceManagement.representation;

import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

public class ServiceRepresentationFactory {

    private ServiceRepresentationFactory() {

    }

    public static List<ServiceRepresentation> createServiceRepresentations(BundleContext bundleContext,
                                                                           ServiceReference<?>[] serviceReferences) {
        Objects.requireNonNull(bundleContext);
        Objects.requireNonNull(serviceReferences);

        List<ServiceRepresentation> representations = new ArrayList<>();

        for (ServiceReference<?> reference : serviceReferences) {
            Object service = bundleContext.getService(reference);
            for (Class<?> serviceInterface : service.getClass().getInterfaces()) {
                representations.add(new ServiceRepresentation(
                        getClassName(service),
                        getClassName(serviceInterface),
                        getServiceMethods(serviceInterface)));
            }
        }

        return representations;
    }


    public static String getClassName(Object service) {
        Class<?> clazz = service.getClass();
        return Stream.of(clazz.getCanonicalName(), clazz.getName(), clazz.getSimpleName(), clazz.getTypeName())
                .filter(Objects::nonNull)
                .findFirst()
                .orElse(null);
    }

    private static List<String> getServiceMethods(Class<?> interfaceClass) {
        List<String> methods = new ArrayList<>();
        String delimiter;
        
        for (Method method : interfaceClass.getMethods()) {
            StringBuilder sb = new StringBuilder();
            delimiter = "";
            sb.append(method.getName()).append("(");
            for (String parameter : getMethodParameters(method)) {
                sb.append(delimiter);
                delimiter = ", ";
                sb.append(parameter);
            }
            sb.append(")");
            methods.add(sb.toString());
        }

        return methods;
    }

    private static List<String> getMethodParameters(Method method) {
        List<String> parameters = new ArrayList<>();
        for (Parameter parameter : method.getParameters()) {
            parameters.add(parameter.getType().getSimpleName() + " " + parameter.getName());
        }

        return parameters;
    }
}
