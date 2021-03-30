package com.github.awrb.osgi.webmanager.logs.messaging;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.awrb.osgi.webmanager.core.messaging.ClientQueryCouple;
import com.github.awrb.osgi.webmanager.core.messaging.JsonConstants;
import com.github.awrb.osgi.webmanager.core.messaging.MessageHandler;
import com.github.awrb.osgi.webmanager.core.messaging.MessageHandlerBase;
import com.github.awrb.osgi.webmanager.core.messaging.enums.MessageTypeEnum;
import com.github.awrb.osgi.webmanager.logs.representation.serialization.JsonMapper;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.log.LogEntry;
import org.osgi.service.log.LogListener;
import org.osgi.service.log.LogReaderService;
import org.osgi.service.log.LogService;

import javax.jms.Session;

@Component(service = MessageHandler.class, immediate = true)
public class LogHandler extends MessageHandlerBase<LogEntry> implements MessageHandler {

    private static final String JMS_DESTINATION_NAME = "logs";
    private JsonNodeFactory jsonNodeFactory = JsonNodeFactory.instance;

    private LogListener logListener;
    private LogReaderService logReaderService;

    @Reference
    private LogService logService;

    @Reference(service = LogReaderService.class)
    public void setLogReaderService(LogReaderService logReaderService) {
        this.logReaderService = logReaderService;
    }

    @Activate
    private void activate() {
        LogListener logListener = this::onMessage;
        logReaderService.addLogListener(logListener);
    }

    @Deactivate
    private void deactivate() {
        this.logReaderService.removeLogListener(logListener);
        this.close();
    }


    @Override
    public String getSupportedDestination() {
        return JMS_DESTINATION_NAME;
    }

    @Override
    public synchronized ClientQueryCouple subscribe(String clientId, String query, Session session) {
        logService.log(LogService.LOG_INFO, clientId);
        logService.log(LogService.LOG_INFO, query);
        return super.subscribe(clientId, query, session);
    }

    @Override
    public String process(LogEntry message) {
        ObjectNode objectNode = jsonNodeFactory.objectNode();
        objectNode.put(JsonConstants.TYPE, MessageTypeEnum.LOG.name());
        objectNode.set(JsonConstants.PAYLOAD, JsonMapper.serialize(message));
        return objectNode.toString();
    }
}
