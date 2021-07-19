package com.github.awrb.osgi.webmanager.serviceManagement.representation;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RemoteProcedureCallResult {


    @JsonCreator
    public RemoteProcedureCallResult(@JsonProperty Object result) {
        this.result = result;
    }

    private Object result;

    public Object getResult() {
        return result;
    }


    @Override
    public String toString() {
        return "RemoteProcedureCallResult{" +
                "result=" + result +
                '}';
    }
}
