package com.github.awrb.osgi.webmanager.summary;

import org.osgi.framework.Bundle;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BundleSummary {

    private long numOfBundles;
    private long numOfActiveBundles;
    private float resolvedPercent;
    private float activePercent;
    private float installedPercent;

    public BundleSummary() {

    }

    public BundleSummary(List<Bundle> bundles) {
        this.numOfBundles = bundles.size();

        Map<Integer, Long> bundlesPerState = bundles.stream()
                .collect(Collectors.groupingBy(Bundle::getState, Collectors.counting()));

        this.numOfActiveBundles = bundlesPerState.getOrDefault(Bundle.ACTIVE, 0L);
        this.activePercent = (float) bundlesPerState.getOrDefault(Bundle.ACTIVE, 0L) / this.numOfBundles;
        this.resolvedPercent = (float) bundlesPerState.getOrDefault(Bundle.RESOLVED, 0L) / this.numOfBundles;
        this.installedPercent = (float) bundlesPerState.getOrDefault(Bundle.INSTALLED, 0L) / this.numOfBundles;
    }

    public long getNumOfBundles() {
        return numOfBundles;
    }

    public long getNumOfActiveBundles() {
        return numOfActiveBundles;
    }

    public float getResolvedPercent() {
        return resolvedPercent;
    }

    public float getActivePercent() {
        return activePercent;
    }

    public float getInstalledPercent() {
        return installedPercent;
    }


    @Override
    public String toString() {
        return "BundleSummary{" +
                "numOfBundles=" + numOfBundles +
                ", numOfActiveBundles=" + numOfActiveBundles +
                ", resolvedPercent=" + resolvedPercent +
                ", activePercent=" + activePercent +
                ", installedPercent=" + installedPercent +
                '}';
    }
}
