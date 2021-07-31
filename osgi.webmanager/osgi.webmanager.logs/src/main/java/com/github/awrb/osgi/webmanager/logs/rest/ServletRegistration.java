package com.github.awrb.osgi.webmanager.logs.rest;

import com.github.awrb.osgi.webmanager.logs.representation.serialization.JacksonFeature;
import org.glassfish.jersey.internal.inject.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.servlet.ServletContainer;
import org.glassfish.jersey.servlet.WebConfig;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicyOption;
import org.osgi.service.http.whiteboard.HttpWhiteboardConstants;
import org.osgi.service.log.LogReaderService;
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
        property = {"alias=/api/logs",
                HttpWhiteboardConstants.HTTP_WHITEBOARD_SERVLET_INIT_PARAM_PREFIX +
                        ServerProperties.PROVIDER_PACKAGES + "=" +
                        "com.github.awrb.osgi.webmanager.logs.rest"
        })
public class ServletRegistration extends ServletContainer {

    private LogService logService;

    @Reference(cardinality = ReferenceCardinality.OPTIONAL, service = LogReaderService.class)
    private LogReaderService logReaderService;


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

        copyOfExistingConfig.register(JacksonFeature.class);
        copyOfExistingConfig.register(new AbstractBinder() {
            @Override
            protected void configure() {
                bind(logService).to(LogService.class);
                bind(logReaderService).to(LogReaderService.class);
            }
        });
        reload(copyOfExistingConfig);
    }

}
