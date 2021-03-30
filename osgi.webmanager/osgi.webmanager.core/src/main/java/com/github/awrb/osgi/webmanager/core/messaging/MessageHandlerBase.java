package com.github.awrb.osgi.webmanager.core.messaging;

import javax.jms.*;
import java.util.HashMap;
import java.util.Map;

public abstract class MessageHandlerBase<T> {

    protected Map<ClientQueryCouple, Session> clientIdToSession = new HashMap<>();

    public void onMessage(T message) {
        this.broadcast(this.process(message));
    }

    public synchronized ClientQueryCouple subscribe(String clientId, String query, Session session) {
        ClientQueryCouple result = new ClientQueryCouple(clientId, query);
        clientIdToSession.put(result, session);
        return result;
    }

    public synchronized ClientQueryCouple unsubscribe(String clientId, String query) {
        ClientQueryCouple result = new ClientQueryCouple(clientId, query);
        clientIdToSession.remove(result);
        return result;
    }

    public void broadcast(String message) {
        for (ClientQueryCouple clientQueryCouple : clientIdToSession.keySet()) {
            send(message, clientQueryCouple);
        }
    }

    public void send(String message, ClientQueryCouple clientQueryCouple) {
        Session session = clientIdToSession.get(clientQueryCouple);

        if (session == null) {
            return;
        }

        try {
            Destination destination = session.createTopic(clientQueryCouple.getQuery());
            MessageProducer producer = session.createProducer(destination);
            TextMessage textMessage = session.createTextMessage(message);
            producer.send(textMessage);
        } catch (JMSException e) {
        }
    }

    public synchronized void close() {
        // unsubscribe for every single one, such that anyone overriding unsubscribe()
        // automatically gets a working close() function
        Map<ClientQueryCouple, Session> copyMap = new HashMap<>(clientIdToSession);
        for (ClientQueryCouple couple : copyMap.keySet()) {
            unsubscribe(couple.getClientId(), couple.getQuery());
        }
    }

    public abstract String process(T message);

}

