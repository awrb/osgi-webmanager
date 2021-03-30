package com.github.awrb.osgi.webmanager.event.rest;

import com.github.awrb.osgi.webmanager.event.representation.EventPublicationRequest;
import com.github.awrb.osgi.webmanager.core.utils.DictionarySupport;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventAdmin;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("/")
@Component(service = EventService.class)
public class EventService {

    @Inject
    private EventAdmin eventAdmin;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void broadcastEvent(EventPublicationRequest request) {
        Event event = new Event(request.getTopic(), DictionarySupport.valueOf(request.getProperties()));
        if (request.isAsynchronous()) {
            eventAdmin.postEvent(event);
        } else {
            eventAdmin.sendEvent(event);
        }
    }
}
