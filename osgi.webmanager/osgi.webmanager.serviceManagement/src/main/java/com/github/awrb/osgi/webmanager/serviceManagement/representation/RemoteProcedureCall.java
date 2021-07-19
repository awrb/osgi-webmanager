package com.github.awrb.osgi.webmanager.serviceManagement.representation;

import java.util.List;

public class RemoteProcedureCall {

    private String service;
    private String methodName;
    private List<String> parameterTypes;
    private List<Object> parameterValues;

    public String getService() {
        return service;
    }

    public List<String> getParameterTypes() {
        return parameterTypes;
    }

    public String getMethodName() {
        return methodName;
    }

    public List<Object> getParameterValues() {
        return parameterValues;
    }
}
