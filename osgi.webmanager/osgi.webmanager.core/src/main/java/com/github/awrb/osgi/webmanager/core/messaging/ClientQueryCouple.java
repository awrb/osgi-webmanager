package com.github.awrb.osgi.webmanager.core.messaging;

import java.util.Objects;

public class ClientQueryCouple {

    private String clientId;
    private String query;

    public ClientQueryCouple(String clientId, String query) {
        this.clientId = clientId;
        this.query = query;
    }

    public String getClientId() {
        return clientId;
    }

    public String getQuery() {
        return query;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClientQueryCouple that = (ClientQueryCouple) o;
        return Objects.equals(clientId, that.clientId) &&
                Objects.equals(query, that.query);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clientId, query);
    }
}
