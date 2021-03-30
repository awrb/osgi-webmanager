package com.github.awrb.osgi.webmanager.bundle.representation.mixins;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.github.awrb.osgi.webmanager.bundle.representation.serialization.BundleSerializer;

@JsonSerialize(using = BundleSerializer.class)
public abstract class BundleMixin {
}
