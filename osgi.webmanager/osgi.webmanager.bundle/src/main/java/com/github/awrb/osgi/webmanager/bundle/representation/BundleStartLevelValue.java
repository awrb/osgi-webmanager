package com.github.awrb.osgi.webmanager.bundle.representation;

/**
 * This boxes a bundle start level.
 */
public class BundleStartLevelValue {

    private int startLevel;

    public BundleStartLevelValue() {
    }

    public BundleStartLevelValue(int startLevel) {
        this.startLevel = startLevel;
    }

    public int getStartLevel() {
        return startLevel;
    }

    public void setStartLevel(int startLevel) {
        this.startLevel = startLevel;
    }
}
