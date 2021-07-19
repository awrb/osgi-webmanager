package com.github.awrb.osgi.webmanager.serviceManagement.messaging;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.awrb.osgi.webmanager.core.messaging.MessageHandler;
import com.github.awrb.osgi.webmanager.core.messaging.MessageHandlerBase;
import com.github.awrb.osgi.webmanager.core.messaging.JsonConstants;
import com.github.awrb.osgi.webmanager.core.messaging.enums.MessageTypeEnum;
import com.github.awrb.osgi.webmanager.serviceManagement.representation.ServiceRepresentationFactory;
import com.github.awrb.osgi.webmanager.serviceManagement.representation.enums.ServiceEventEnum;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceEvent;
import org.osgi.framework.ServiceListener;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;

@Component(service = MessageHandler.class, immediate = true)
public class ServiceHandler extends MessageHandlerBase<ServiceEvent> implements MessageHandler {

    private static final JsonNodeFactory jsonNodeFactory = JsonNodeFactory.instance;
    private static final String JMS_DESTINATION_NAME = "services";

    private BundleContext bundleContext;
    private ServiceListener serviceListener;

    @Activate
    private void activate(BundleContext bundleContext) {
        this.bundleContext = bundleContext;
        serviceListener = this::onMessage;
        bundleContext.addServiceListener(serviceListener);
    }

    @Deactivate
    private void deactivate() {
        bundleContext.removeServiceListener(serviceListener);
        bundleContext = null;
        this.close();
    }

    @Override
    public String getSupportedDestination() {
        return JMS_DESTINATION_NAME;
    }

    @Override
    public String process(ServiceEvent event) {
//        ObjectNode node = jsonNodeFactory.objectNode();
//        node.put(JsonConstants.TYPE, MessageTypeEnum.SERVICE.name());
//        ObjectNode payload = jsonNodeFactory.objectNode();
//        payload.put(JsonConstants.TYPE, ServiceEventEnum.get(event.getType()).name());
//        payload.putPOJO("service", ServiceRepresentationFactory.createServiceRepresentation(
//                bundleContext, event.getServiceReference()));
//        node.set(JsonConstants.PAYLOAD, payload);
//        return node.toString();
        return "";
    }
}
