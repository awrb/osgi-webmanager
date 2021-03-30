package com.github.awrb.osgi.webmanager.configuration.rest;

import com.github.awrb.osgi.webmanager.configuration.representation.ConfigurationCreation;
import com.github.awrb.osgi.webmanager.configuration.representation.ConfigurationRepresentation;
import com.github.awrb.osgi.webmanager.core.utils.DictionarySupport;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.log.LogService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static java.util.stream.Collectors.toList;
import static javax.ws.rs.core.Response.Status.*;

/**
 * This lets you browse and update OSGi configuration using OSGi {@link ConfigurationAdmin}.
 */
@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class ConfigurationService {

    @Inject
    private ConfigurationAdmin admin;

    @Inject
    private LogService logService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ConfigurationRepresentation> getConfigurations(@QueryParam("filter") String filter) {
        try {
            Configuration[] configurations = admin.listConfigurations(filter);
            if (configurations == null) {
                return Collections.emptyList();
            }
            return Arrays.stream(admin.listConfigurations(filter))
                    .map(this::createConfigurationRepresentation)
                    .collect(toList());
        } catch (InvalidSyntaxException | IOException e) {
            throw new WebApplicationException(BAD_REQUEST);
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{pid}")
    public ConfigurationRepresentation getConfiguration(@PathParam("pid") String pid,
                                                        @QueryParam("location") String location) {
        try {

            Configuration configuration;
            if (location == null) {
                configuration = admin.getConfiguration(pid);
            } else {
                configuration = admin.getConfiguration(pid, location);
            }
            if (configuration == null) {
                throw new WebApplicationException(NOT_FOUND);
            }
            return createConfigurationRepresentation(configuration);
        } catch (IOException e) {
            throw new WebApplicationException(e, INTERNAL_SERVER_ERROR);
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createConfiguration(ConfigurationCreation creation) {
        try {
            admin.createFactoryConfiguration(creation.getFactoryPid(), creation.getLocation());
        } catch (IOException e) {
            throw new WebApplicationException(e, BAD_REQUEST);
        }
    }

    private ConfigurationRepresentation createConfigurationRepresentation(Configuration configuration) {
        return new ConfigurationRepresentation(
                configuration.getPid(),
                configuration.getBundleLocation(),
                configuration.getChangeCount(),
                configuration.getFactoryPid(),
                DictionarySupport.toMap(configuration.getProperties())
        );
    }
}
