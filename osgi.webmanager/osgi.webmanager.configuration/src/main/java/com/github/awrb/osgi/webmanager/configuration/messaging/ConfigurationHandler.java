package com.github.awrb.osgi.webmanager.configuration.messaging;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.awrb.osgi.webmanager.core.messaging.JsonConstants;
import com.github.awrb.osgi.webmanager.core.messaging.MessageHandler;
import com.github.awrb.osgi.webmanager.core.messaging.MessageHandlerBase;
import com.github.awrb.osgi.webmanager.core.messaging.enums.MessageTypeEnum;
import com.github.awrb.osgi.webmanager.core.utils.OSGiPropertyConstants;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.cm.ConfigurationEvent;
import org.osgi.service.cm.ConfigurationListener;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;

@Component(service = MessageHandler.class, immediate = true)
public class ConfigurationHandler extends MessageHandlerBase<ConfigurationEvent> implements MessageHandler {

    private static final String JMS_DESTINATION_NAME = "configuration";
    private static final JsonNodeFactory jsonNodeFactory = JsonNodeFactory.instance;

    private ServiceRegistration<ConfigurationListener> registration;

    @Activate
    private void activate(BundleContext bundleContext) {
        ConfigurationListener listener = this::onMessage;
        registration = bundleContext.registerService(ConfigurationListener.class, listener, null);
    }

    @Activate
    private void deactivate() {
        this.close();
        if (registration != null) {
            registration.unregister();
        }
    }

    @Override
    public String getSupportedDestination() {
        return JMS_DESTINATION_NAME;
    }

    @Override
    public String process(ConfigurationEvent message) {

        ObjectNode root = jsonNodeFactory.objectNode();
        root.put(JsonConstants.TYPE, MessageTypeEnum.CONFIGURATION.name());

        ObjectNode payload = jsonNodeFactory.objectNode();
        payload.put("factoryPid", message.getFactoryPid());
        payload.put("pid", message.getPid());
        payload.put("type", message.getType());
        payload.put("bundleId", message.getReference().getBundle().getBundleId());
        payload.put("serviceId", (Long) message.getReference().getProperty(OSGiPropertyConstants.SERVICE_ID));

        root.set(JsonConstants.PAYLOAD, payload);
        return root.toString();
    }
}
