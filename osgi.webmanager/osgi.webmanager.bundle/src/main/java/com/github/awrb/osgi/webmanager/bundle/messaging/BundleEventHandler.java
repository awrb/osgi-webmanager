package com.github.awrb.osgi.webmanager.bundle.messaging;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.awrb.osgi.webmanager.bundle.representation.enums.BundleEventEnum;
import com.github.awrb.osgi.webmanager.bundle.representation.serialization.JsonMapper;
import com.github.awrb.osgi.webmanager.core.messaging.JsonConstants;
import com.github.awrb.osgi.webmanager.core.messaging.MessageHandler;
import com.github.awrb.osgi.webmanager.core.messaging.MessageHandlerBase;
import org.osgi.framework.BundleContext;
import org.osgi.framework.BundleEvent;
import org.osgi.framework.BundleListener;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;


@Component(immediate = true, service = MessageHandler.class)
public class BundleEventHandler extends MessageHandlerBase<BundleEvent> implements MessageHandler {

    private static final String JMS_DESTINATION_NAME = "bundles";
    private static final JsonNodeFactory jsonNodeFactory = JsonNodeFactory.instance;

    private BundleListener bundleListener;
    private BundleContext bundleContext;

    @Activate
    private void activate(BundleContext bundleContext) {
        this.bundleContext = bundleContext;
        bundleListener = this::onMessage;
        bundleContext.addBundleListener(bundleListener);
    }

    @Deactivate
    private void deactivate() {
        this.bundleContext.removeBundleListener(bundleListener);
        this.bundleContext = null;
        this.close();
    }


    @Override
    public String getSupportedDestination() {
        return JMS_DESTINATION_NAME;
    }

    @Override
    public String process(BundleEvent bundleEvent) {
        ObjectNode node = jsonNodeFactory.objectNode();
        int eventType = bundleEvent.getType();
        BundleEventEnum eventEnum = BundleEventEnum.get(eventType);
        node.put(JsonConstants.TYPE, eventEnum.name());
        node.set(JsonConstants.PAYLOAD, JsonMapper.serialize(bundleEvent.getBundle()));
        return node.toString();
    }
}
