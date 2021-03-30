package com.github.awrb.osgi.webmanager.preferences.rest;

import org.osgi.service.deploymentadmin.DeploymentAdmin;
import org.osgi.service.prefs.Preferences;
import org.osgi.service.prefs.PreferencesService;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;


// TODO passing PreferencesService from other bundles?
@Path("/")
public class PreferencesManager {

    @Inject
    private PreferencesService preferencesService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Preferences getUserPreferences(@QueryParam("user") String user) {
        return preferencesService.getUserPreferences(user);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/system")
    public Preferences getSystemPreferences() {
        return preferencesService.getSystemPreferences();
    }
}
