package com.github.awrb.osgi.webmanager.serviceManagement.representation;

import java.util.List;

public class ServiceRepresentation {

    private String interfaceName;
    private String implementationName;
    private List<String> methods;

    public ServiceRepresentation() {
    }

    public ServiceRepresentation(String interfaceName, String implementationName, List<String> methods) {
        this.interfaceName = interfaceName;
        this.implementationName = implementationName;
        this.methods = methods;
    }

    public String getInterfaceName() {
        return interfaceName;
    }

    public void setInterfaceName(String interfaceName) {
        this.interfaceName = interfaceName;
    }

    public List<String> getMethods() {
        return methods;
    }

    public void setMethods(List<String> methods) {
        this.methods = methods;
    }


    @Override
    public String toString() {
        return "ServiceRepresentation{" +
                "interfaceName='" + interfaceName + '\'' +
                ", implementationName='" + implementationName + '\'' +
                ", methods=" + methods +
                '}';
    }
}
