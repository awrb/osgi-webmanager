package com.github.awrb.osgi.webmanager.core.messaging;

import javax.jms.Session;

public interface MessageHandler {

    String getSupportedDestination();

    ClientQueryCouple subscribe(String clientId, String topic, Session session);

    ClientQueryCouple unsubscribe(String clientId, String topic);


}
