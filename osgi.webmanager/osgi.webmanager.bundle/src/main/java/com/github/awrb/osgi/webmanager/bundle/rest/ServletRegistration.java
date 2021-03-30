package com.github.awrb.osgi.webmanager.bundle.rest;

import org.glassfish.jersey.internal.inject.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.servlet.ServletContainer;
import org.glassfish.jersey.servlet.WebConfig;
import org.osgi.framework.BundleContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.http.whiteboard.HttpWhiteboardConstants;
import org.osgi.service.log.LogService;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.ws.rs.container.ContainerResponseFilter;

/**
 * This registers a servlet and configures Jersey for dependency injection.
 * <p>
 * For JAX-RS resources injectable services are specified here in {@link this#init(WebConfig)}
 * and are injected with {@code @Inject} annotation.
 */
@Component(service = Servlet.class,
        property = {"alias=/api/bundles",
                HttpWhiteboardConstants.HTTP_WHITEBOARD_SERVLET_INIT_PARAM_PREFIX +
                        ServerProperties.PROVIDER_PACKAGES + "=" +
                        "com.github.awrb.osgi.webmanager.bundle.rest"
        })
public class ServletRegistration extends ServletContainer {

    private LogService logService;
    private BundleContext bundleContext;

    @Activate
    private void activate(BundleContext bundleContext) {
        this.bundleContext = bundleContext;
    }

    @Deactivate
    private void deactivate() {
        this.bundleContext = null;
    }


    @Reference(service = LogService.class)
    public void setLogService(LogService logService) {
        this.logService = logService;
    }


    @Override
    protected void init(WebConfig webConfig) throws ServletException {
        super.init(webConfig);
        ResourceConfig copyOfExistingConfig = new ResourceConfig(getConfiguration());

        copyOfExistingConfig.register((ContainerResponseFilter) (containerRequestContext, response) -> {
            response.getHeaders().add("Access-Control-Allow-Origin", "*");
            response.getHeaders().add("Access-Control-Allow-Headers",
                    "CSRF-Token, X-Requested-By, Authorization, Content-Type");
            response.getHeaders().add("Access-Control-Allow-Credentials", "true");
            response.getHeaders().add("Access-Control-Allow-Methods",
                    "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        });

        copyOfExistingConfig.register(new AbstractBinder() {
            @Override
            protected void configure() {
                bind(logService).to(LogService.class);
                bind(bundleContext).to(BundleContext.class);
            }
        });
        reload(copyOfExistingConfig);
    }

}
