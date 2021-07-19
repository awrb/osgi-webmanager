package com.github.awrb.osgi.webmanager.serviceManagement.rest;

import com.github.awrb.osgi.webmanager.core.rest.HttpResponseFactory;
import com.github.awrb.osgi.webmanager.serviceManagement.representation.RemoteProcedureCall;
import com.github.awrb.osgi.webmanager.serviceManagement.representation.RemoteProcedureCallResult;
import com.github.awrb.osgi.webmanager.serviceManagement.representation.ServiceRepresentation;
import com.github.awrb.osgi.webmanager.serviceManagement.representation.ServiceRepresentationFactory;
import org.osgi.framework.BundleContext;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * This lets you browse OSGi services.
 *
 * @see ServiceReference
 */
@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class RpcService {

    @Inject
    private BundleContext bundleContext;

    /**
     * Retrieves service references based on the provided parameters.
     *
     * @param clazz  class of the service, if null is provided then all classes are retrieved
     * @param filter OSGi LDAP filter, if null is provided then no filter is used
     * @return a list of {@link ServiceRepresentation}
     * @throws WebApplicationException with 400 status if the filter is not LDAP compliant
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ServiceRepresentation> getServices(@QueryParam("class") String clazz,
                                                   @QueryParam("filter") String filter) {
        try {
            ServiceReference<?>[] serviceReferences = bundleContext.getAllServiceReferences(clazz, filter);
            return ServiceRepresentationFactory.createServiceRepresentations(bundleContext, serviceReferences);
        } catch (InvalidSyntaxException e) {
            throw new WebApplicationException(HttpResponseFactory.createBadRequestResponse(e.toString()));
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public RemoteProcedureCallResult invoke(RemoteProcedureCall remoteProcedureCall) {
        try {
            ServiceReference<?> serviceReference = bundleContext.getServiceReference(remoteProcedureCall.getService());
            Object service = bundleContext.getService(serviceReference);
            List<Class<?>> parameterTypes = new ArrayList<>();
            for (String s : remoteProcedureCall.getParameterTypes()) {
                Class<?> aClass = forNameOrPrimitive(s);
                parameterTypes.add(aClass);
            }
            Class<?>[] parameterTypesArray = parameterTypes.toArray(new Class<?>[0]);
            Method method = service.getClass().getMethod(remoteProcedureCall.getMethodName(), parameterTypesArray);
            method.setAccessible(true); // NOSONAR
            Object result = method.invoke(service, remoteProcedureCall.getParameterValues().toArray());
            return new RemoteProcedureCallResult(result);
        } catch (ClassNotFoundException | NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
            throw new WebApplicationException(e);
        }
    }

    private Class<?> forNameOrPrimitive(String s) throws ClassNotFoundException {
        if (s.equals("int")) {
            return int.class;
        }

        return Class.forName(s);
    }
}

