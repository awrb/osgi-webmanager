package com.github.awrb.osgi.webmanager.event.messaging;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.awrb.osgi.webmanager.core.JsonProvider;
import com.github.awrb.osgi.webmanager.core.messaging.*;
import com.github.awrb.osgi.webmanager.core.messaging.enums.MessageTypeEnum;
import com.github.awrb.osgi.webmanager.event.representation.mixins.EventMixin;
import com.github.awrb.osgi.webmanager.event.representation.serialization.JsonMapper;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;

import javax.jms.Session;
import java.util.*;

@Component(service = MessageHandler.class, immediate = true)
public class OSGiEventHandler extends MessageHandlerBase<Event> implements MessageHandler {

    private static final String JMS_DESTINATION_NAME = "events";
    private static final JsonNodeFactory jsonNodeFactory = JsonNodeFactory.instance;

    private BundleContext bundleContext;

    private Map<ClientQueryCouple, ServiceRegistration<EventHandler>> subscriptions;

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
        properties.put(EventConstants.EVENT_TOPIC, topic == null ? "*" : topic);

        EventHandler eventHandler = this::onMessage;

        ServiceRegistration<EventHandler> registration = bundleContext.registerService(
                EventHandler.class, eventHandler, properties);

        ClientQueryCouple clientQueryCouple = super.subscribe(clientId, query, session);
        subscriptions.put(clientQueryCouple, registration);

        return clientQueryCouple;
    }

    @Override
    public synchronized ClientQueryCouple unsubscribe(String clientId, String query) {
        ClientQueryCouple clientQueryCouple = super.unsubscribe(clientId, query);

        ServiceRegistration<EventHandler> registration = subscriptions.get(clientQueryCouple);
        if (registration != null) {
            registration.unregister();
        }
        subscriptions.remove(clientQueryCouple);

        return clientQueryCouple;
    }


    @Override
    public String getSupportedDestination() {
        return JMS_DESTINATION_NAME;
    }

    @Override
    public String process(Event event) {
        ObjectNode root = jsonNodeFactory.objectNode();
        ObjectNode payload = jsonNodeFactory.objectNode();
        payload.putPOJO(JsonConstants.EVENT, JsonMapper.serialize(event));
        root.put(JsonConstants.TYPE, MessageTypeEnum.EVENT.name());
        payload.put(JsonConstants.UUID, UUID.randomUUID().toString());
        root.put(JsonConstants.PAYLOAD, payload);

        return root.toString();
    }
}
