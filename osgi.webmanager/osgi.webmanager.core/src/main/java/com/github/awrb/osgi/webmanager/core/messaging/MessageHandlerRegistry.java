package com.github.awrb.osgi.webmanager.core.messaging;

import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.util.tracker.ServiceTracker;

import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

/**
 * This class is responsible for deciding how to handle an ActiveMQ message
 * by picking the proper {@link MessageHandlerBase} based on the JMS destination.
 * <p>
 * Implementations of {@link MessageHandlerBase} should be referenced here.
 */

@Component(service = MessageHandlerRegistry.class, immediate = true)
public class MessageHandlerRegistry {

    private Set<MessageHandler> messageHandlers = new HashSet<>();

    private ServiceTracker<MessageHandler, MessageHandler> handlerServiceTracker;

    @Activate
    private void activate(BundleContext bundleContext) {
        handlerServiceTracker = new ServiceTracker<MessageHandler, MessageHandler>(
                bundleContext, MessageHandler.class, null) {

            @Override
            public MessageHandler addingService(ServiceReference<MessageHandler> reference) {
                MessageHandler handler = bundleContext.getService(reference);
                messageHandlers.add(handler);
                return handler;
            }

            @Override
            public void removedService(ServiceReference<MessageHandler> reference, MessageHandler service) {
                super.removedService(reference, service);
                messageHandlers.remove(service);
            }
        };

        handlerServiceTracker.open();
    }

    @Deactivate
    private void deactivate() {
        if (handlerServiceTracker != null) {
            handlerServiceTracker.close();
        }
        handlerServiceTracker = null;
    }

    public Optional<MessageHandler> getHandlerForJmsTopic(String topic) {
        Objects.requireNonNull(topic);
        return messageHandlers.stream().filter(handler ->
                topic.startsWith(handler.getSupportedDestination())).findAny();
    }
}
