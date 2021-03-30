package com.github.awrb.osgi.webmanager.core.rest;

//import com.github.awrb.utils.DefaultSerializer;

import javax.ws.rs.core.Response;

import static javax.ws.rs.core.Response.Status.BAD_REQUEST;

public class HttpResponseFactory {

    public static Response createBadRequestResponse(String message) {
        return Response.status(BAD_REQUEST)
//                .entity(DefaultSerializer.createErrorNode(message))
                .build();
    }
}
