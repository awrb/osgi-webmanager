package com.github.awrb.osgi.webmanager.summary;

public class SystemSummary {

    private JvmProperties jvmProperties;
    private BundleSummary bundleSummary;
    private LogSummary logSummary;

    public SystemSummary() {
    }

    public SystemSummary(JvmProperties jvmProperties, BundleSummary bundleSummary, LogSummary logSummary) {
        this.jvmProperties = jvmProperties;
        this.bundleSummary = bundleSummary;
        this.logSummary = logSummary;
    }

    public JvmProperties getJvmProperties() {
        return jvmProperties;
    }

    public BundleSummary getBundleSummary() {
        return bundleSummary;
    }

    public LogSummary getLogSummary() {
        return logSummary;
    }


    @Override
    public String toString() {
        return "SystemSummary{" +
                "jvmProperties=" + jvmProperties +
                ", bundleSummary=" + bundleSummary +
                ", logSummary=" + logSummary +
                '}';
    }
}
