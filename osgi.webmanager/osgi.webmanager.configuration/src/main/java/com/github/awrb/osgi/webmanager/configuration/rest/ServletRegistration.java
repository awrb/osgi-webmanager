package com.github.awrb.osgi.webmanager.configuration.rest;

import org.glassfish.jersey.internal.inject.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.servlet.ServletContainer;
import org.glassfish.jersey.servlet.WebConfig;
import org.osgi.framework.BundleContext;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.EventAdmin;
import org.osgi.service.http.whiteboard.HttpWhiteboardConstants;
import org.osgi.service.log.LogReaderService;
import org.osgi.service.log.LogService;
import org.osgi.service.prefs.PreferencesService;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

/**
 * This registers a servlet and configures Jersey for dependency injection.
 * <p>
 * For JAX-RS resources injectable services are specified here in {@link this#init(WebConfig)}
 * and are injected with {@code @Inject} annotation.
 */
@Component(service = Servlet.class,
        property = {"alias=/api/configuration",
                HttpWhiteboardConstants.HTTP_WHITEBOARD_SERVLET_INIT_PARAM_PREFIX +
                        ServerProperties.PROVIDER_PACKAGES + "=" +
                        "com.github.awrb.osgi.webmanager.configuration.rest"
        })
public class ServletRegistration extends ServletContainer {

    private LogService logService;
    private ConfigurationAdmin configurationAdmin;

    @Reference(service = LogService.class)
    public void setLogService(LogService logService) {
        this.logService = logService;
    }

    @Reference(service = ConfigurationAdmin.class)
    public void setConfigurationAdmin(ConfigurationAdmin configurationAdmin) {
        this.configurationAdmin = configurationAdmin;
    }

    @Override
    protected void init(WebConfig webConfig) throws ServletException {
        super.init(webConfig);
        ResourceConfig copyOfExistingConfig = new ResourceConfig(getConfiguration());

        copyOfExistingConfig.register(new AbstractBinder() {
            @Override
            protected void configure() {
                bind(logService).to(LogService.class);
                bind(configurationAdmin).to(ConfigurationAdmin.class);
            }
        });
        reload(copyOfExistingConfig);
    }

}
