package com.github.awrb.osgi.webmanager.summary;

public class JvmProperties {

    private long totalMemory;
    private long maxMemory;
    private long freeMemory;
    private int availableProcessors;
    private int numOfActiveThreads;

    public JvmProperties() {
        totalMemory = Runtime.getRuntime().totalMemory();
        maxMemory = Runtime.getRuntime().maxMemory();
        freeMemory = Runtime.getRuntime().freeMemory();
        availableProcessors = Runtime.getRuntime().availableProcessors();
        numOfActiveThreads = Thread.getAllStackTraces().size();
    }

    public long getTotalMemory() {
        return totalMemory;
    }

    public long getMaxMemory() {
        return maxMemory;
    }

    public long getFreeMemory() {
        return freeMemory;
    }

    public int getAvailableProcessors() {
        return availableProcessors;
    }

    public int getNumOfActiveThreads() {
        return numOfActiveThreads;
    }


    @Override
    public String toString() {
        return "JvmProperties{" +
                "totalMemory=" + totalMemory +
                ", maxMemory=" + maxMemory +
                ", freeMemory=" + freeMemory +
                ", availableProcessors=" + availableProcessors +
                ", numOfActiveThreads=" + numOfActiveThreads +
                '}';
    }
}
