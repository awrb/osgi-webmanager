package com.github.awrb.osgi.webmanager.core.messaging;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.advisory.AdvisorySupport;
import org.apache.activemq.command.ActiveMQDestination;
import org.apache.activemq.command.ActiveMQMessage;
import org.apache.activemq.command.ActiveMQTopic;
import org.apache.activemq.command.DestinationInfo;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.log.LogService;

import javax.jms.Connection;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.Session;
import java.util.Optional;


@Component(immediate = true)
public class ActiveMQConnector {

    private LogService logService;

    private Connection connection;

    private Session session;

    private MessageHandlerRegistry registry;

    @Reference(service = LogService.class)
    public void setLogService(LogService logService) {
        this.logService = logService;
    }

    @Reference
    public void setRegistry(MessageHandlerRegistry registry) {
        this.registry = registry;
    }

    @Activate
    private void connect() {
        ActiveMQConnectionFactory factory = new ActiveMQConnectionFactory();
        factory.setBrokerURL("tcp://localhost:61616");
        factory.setPassword("admin");
        factory.setUserName("admin");
        factory.setWatchTopicAdvisories(true);
        try {
            Connection connection = factory.createConnection();
            this.connection = connection;
            this.session = createSession();
            MessageConsumer consumer = session.createConsumer(new ActiveMQTopic("ActiveMQ.Advisory.Topic"));

            String clientId = connection.getClientID();

            consumer.setMessageListener(message -> {
                ActiveMQMessage mqMessage = (ActiveMQMessage) message;

                DestinationInfo destinationInfo = (DestinationInfo) mqMessage.getDataStructure();

                ActiveMQDestination destination = destinationInfo.getDestination();
                createConsumerForTopic(destination, clientId);
            });
            connection.start();
            logService.log(LogService.LOG_INFO, "Connected to ActiveMQ");
        } catch (JMSException e) {
            logService.log(LogService.LOG_ERROR, e.toString());
            this.connection = null;
            this.session = null;
        }
    }

    private void createConsumerForTopic(ActiveMQDestination topic, String clientId) {
        String topicName = topic.getPhysicalName();

        Optional<MessageHandler> handlerOptional = registry.getHandlerForJmsTopic(topicName);
        try {
            Session session = createSession();
            MessageConsumer consumer = session.createConsumer(AdvisorySupport.getConsumerAdvisoryTopic(topic));
            consumer.setMessageListener(message -> handlerOptional.ifPresent(messageHandler -> {

                try {
                    if (message.propertyExists("consumerCount")) {
                        if (message.getIntProperty("consumerCount") > 0) {
                            messageHandler.subscribe(clientId, topicName, createSession());
                        } else {
                            messageHandler.unsubscribe(clientId, topicName);
                        }
                    }
                } catch (JMSException e) {
                    logService.log(LogService.LOG_ERROR, e.toString());
                }
            }));
        } catch (JMSException e) {
            logService.log(LogService.LOG_ERROR, e.toString());
        }
    }

    private Session createSession() throws JMSException {
        return connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
    }

    @Deactivate
    private void disconnect() {
        try {
            if (connection != null)
                this.connection.stop();
            if (session != null)
                this.session.close();
        } catch (JMSException e) {
            logService.log(LogService.LOG_ERROR, e.toString());
        }
        this.connection = null;
        this.session = null;
    }
}