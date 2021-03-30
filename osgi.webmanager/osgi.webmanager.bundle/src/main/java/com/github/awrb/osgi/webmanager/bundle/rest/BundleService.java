package com.github.awrb.osgi.webmanager.bundle.rest;

import com.github.awrb.osgi.webmanager.bundle.representation.BundleRepresentation;
import com.github.awrb.osgi.webmanager.bundle.representation.BundleStartLevelValue;
import com.github.awrb.osgi.webmanager.bundle.representation.enums.BundleStateEnum;
import com.github.awrb.osgi.webmanager.core.utils.DictionarySupport;
import com.github.awrb.osgi.webmanager.core.utils.TimeConverter;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.framework.BundleException;
import org.osgi.framework.startlevel.BundleStartLevel;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.log.LogService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Dictionary;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;
import static javax.ws.rs.core.Response.Status.*;


/**
 * Interacts with OSGi bundles.
 * Lets you browse bundles and their metadata and control them.
 * <p>
 * All methods that are parameterized by bundle's id will throw HTTP 404 if a bundle with a given id was not found.
 */
@Path("/")
@Component(service = BundleService.class)
public class BundleService {

    @Inject
    private LogService logService;

    @Inject
    private BundleContext bundleContext;

    /**
     * Returns a list of bundles available from this bundle's context.
     *
     * @return return a list of availabe bundles
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<BundleRepresentation> getBundleRepresentations() {
        return Stream.of(bundleContext.getBundles())
                .map(this::createBundleRepresentation)
                .collect(toList());
    }

    /**
     * Retrieve a single OSGi bundle.
     * Throws 404 if the bundle does not exist.
     *
     * @param id id of the bundle to retrieve
     * @return returns the bundle parameterized by the id
     */
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public BundleRepresentation getBundle(@PathParam("id") Long id) {
        return createBundleRepresentation(getBundleById(id));
    }

    /**
     * Retrieves headers of a single OSGi bundle.
     * Throws 404 if the bundle does not exist.
     *
     * @param id id of the bundle to retrieve
     * @return returns headers represented as a dictionary with string keys and values
     */
    @GET
    @Path("/{id}/headers")
    @Produces(MediaType.APPLICATION_JSON)
    public Dictionary<String, String> getBundleHeaders(@PathParam("id") Long id) {
        return getBundleById(id).getHeaders();
    }

    /**
     * Starts an OSGi bundle.
     * Throws 404 if the bundle does not exist.
     *
     * @param id id of the bundle to start
     */
    @PUT
    @Path("/{id}/start/")
    public void startBundle(@PathParam("id") Long id) {
        try {
            getBundleById(id).start();
        } catch (BundleException e) {
            throw new WebApplicationException(e, INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Stops an OSGi bundle.
     * Throws 404 if the bundle does not exist.
     *
     * @param id id of the bundle to start
     */
    @PUT
    @Path("/{id}/stop/")
    public void stopBundle(@PathParam("id") Long id) {
        try {
            getBundleById(id).stop();
        } catch (BundleException e) {
            throw new WebApplicationException(e, INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This returns start level of a bundle.
     *
     * @param id id of the bundle
     * @return start level of the bundle
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}/start-level")
    public BundleStartLevelValue getStartLevel(@PathParam("id") Long id) {
        return new BundleStartLevelValue(getBundleById(id).adapt(BundleStartLevel.class).getStartLevel());
    }

    /**
     * This returns the state of a bundle.
     *
     * @param id id of the bundle
     * @return state of the bundle
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}/state")
    public BundleStateEnum getBundleState(@PathParam("id") Long id) {
        return BundleStateEnum.get(getBundleById(id).getState());
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{id}/start-level")
    public void setStartLevel(@PathParam("id") Long id, BundleStartLevelValue startLevelValue) {
        try {
            getBundleById(id).adapt(BundleStartLevel.class).setStartLevel(startLevelValue.getStartLevel());
        } catch (SecurityException e) {
            throw new WebApplicationException(e, FORBIDDEN);
        }
    }

    private Bundle getBundleById(long id) {
        return Optional.ofNullable(bundleContext.getBundle(id))
                .orElseThrow(() -> new WebApplicationException(NOT_FOUND));
    }

    private BundleRepresentation createBundleRepresentation(Bundle bundle) {
        return new BundleRepresentation(
                DictionarySupport.toMap(bundle.getHeaders()),
                bundle.getBundleId(),
                TimeConverter.fromMiliseconds(bundle.getLastModified()).toString(),
                bundle.getSymbolicName(),
                bundle.getVersion().toString(),
                bundle.getLocation(),
                bundle.getState()
        );
    }
}
