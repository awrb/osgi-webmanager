package com.github.awrb.osgi.webmanager.serviceManagement.rest;

import com.github.awrb.osgi.webmanager.core.rest.HttpResponseFactory;
import com.github.awrb.osgi.webmanager.serviceManagement.representation.ServiceRepresentation;
import com.github.awrb.osgi.webmanager.serviceManagement.representation.ServiceRepresentationFactory;
import com.github.awrb.osgi.webmanager.core.utils.OSGiPropertyConstants;
import org.osgi.framework.BundleContext;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;
import static javax.ws.rs.core.Response.Status.BAD_REQUEST;
import static javax.ws.rs.core.Response.Status.NOT_FOUND;

/**
 * This lets you browse OSGi services.
 *
 * @see ServiceReference
 */
@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class ServiceBrowser {

    @Inject
    private BundleContext bundleContext;

    /**
     * Retrieves service references based on the provided parameters.
     *
     * @param clazz  class of the service, if null is provided then all classes are retrieved
     * @param filter OSGi ldap filter, if null is provided then no filter is used
     * @return a list of {@link ServiceRepresentation}
     * @throws WebApplicationException with 400 status if the filter is not LDAP compliant
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ServiceRepresentation> getServices(@QueryParam("class") String clazz,
                                                   @QueryParam("filter") String filter) {
        try {
            ServiceReference<?>[] serviceReferences = bundleContext.getAllServiceReferences(clazz, filter);
            return Stream.of(serviceReferences)
                    .map(ServiceRepresentationFactory::createServiceRepresentation)
                    .collect(toList());
        } catch (InvalidSyntaxException e) {
            throw new WebApplicationException(HttpResponseFactory.createBadRequestResponse(e.toString()));
        }
    }

    /**
     * Retrieves a single servic reference based on the provided parameter.
     *
     * @param clazz class of the service
     * @return an array of {@link ServiceReference} from the bundle context
     * * @throws {@link WebApplicationException} with 404 status if the reference was not found
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public ServiceRepresentation getServices(@PathParam("id") long id,
                                             @QueryParam("class") String clazz,
                                             @QueryParam("filter") String filter) {
        try {
            ServiceReference<?>[] references = bundleContext.getAllServiceReferences(clazz, filter);
            Optional<ServiceReference<?>> reference = Stream.of(references)
                    .filter(ref -> ref.getProperty(OSGiPropertyConstants.SERVICE_ID).equals(id))
                    .findAny();
            if (reference.isPresent()) {
                return ServiceRepresentationFactory.createServiceRepresentation(reference.get());
            }
            throw new WebApplicationException(NOT_FOUND);
        } catch (InvalidSyntaxException e) {
            throw new WebApplicationException(BAD_REQUEST);
        }
    }
}

