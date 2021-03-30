package com.github.awrb.osgi.webmanager.event.messaging;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.awrb.osgi.webmanager.core.JsonProvider;
import com.github.awrb.osgi.webmanager.core.messaging.MessageHandler;
import com.github.awrb.osgi.webmanager.core.messaging.ClientQueryCouple;
import com.github.awrb.osgi.webmanager.core.messaging.JsonConstants;
import com.github.awrb.osgi.webmanager.core.messaging.MessageHandlerBase;
import com.github.awrb.osgi.webmanager.core.messaging.QueryProcessor;
import com.github.awrb.osgi.webmanager.core.messaging.enums.MessageTypeEnum;
import com.github.awrb.osgi.webmanager.event.representation.mixins.EventMixin;
import com.github.awrb.osgi.webmanager.event.representation.serialization.JsonMapper;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.osgi.service.log.LogService;

import javax.jms.Session;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

@Component(service = MessageHandler.class, immediate = true)
public class OSGiEventHandler extends MessageHandlerBase<Event> implements MessageHandler {

    private static final String JMS_DESTINATION_NAME = "events";
    private static final JsonNodeFactory jsonNodeFactory = JsonNodeFactory.instance;

    private BundleContext bundleContext;

    private Map<ClientQueryCouple, ServiceRegistration<EventHandler>> subscriptions;

    @Reference
    private LogService logService;

    @Activate
    private void activate(BundleContext bundleContext) {
        JsonProvider.addMixin(Event.class, EventMixin.class);
        subscriptions = new HashMap<>();
        this.bundleContext = bundleContext;
    }

    @Deactivate
    private void deactivate() {
        this.close();
    }


    @Override
    public synchronized ClientQueryCouple subscribe(String clientId, String query, Session session) {

        Dictionary<String, Object> properties = new Hashtable<>();

        String topic = QueryProcessor.toParams(query).get("topic");
        if (topic == null) {
            return null;
        }

        properties.put(EventConstants.EVENT_TOPIC, topic);
        EventHandler eventHandler = this::onMessage;

        ServiceRegistration<EventHandler> registration = bundleContext.
                registerService(EventHandler.class, eventHandler, properties);

        ClientQueryCouple clientQueryCouple = super.subscribe(clientId, query, session);
        subscriptions.put(clientQueryCouple, registration);
        return clientQueryCouple;
    }

    @Override
    public synchronized ClientQueryCouple unsubscribe(String clientId, String query) {
        ClientQueryCouple clientQueryCouple = super.unsubscribe(clientId, query);
        if (clientQueryCouple != null) {
            subscriptions.get(clientQueryCouple).unregister();
            subscriptions.remove(clientQueryCouple);
        }
        return clientQueryCouple;
    }


    @Override
    public String getSupportedDestination() {
        return JMS_DESTINATION_NAME;
    }

    @Override
    public String process(Event event) {
        ObjectNode root = jsonNodeFactory.objectNode();
        root.put(JsonConstants.TYPE, MessageTypeEnum.EVENT.name());
        root.set(JsonConstants.PAYLOAD, JsonMapper.serialize(event));
        return root.toString();
    }
}
