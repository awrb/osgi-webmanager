package com.github.awrb.osgi.webmanager.summary;

import org.osgi.framework.BundleContext;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.log.LogEntry;
import org.osgi.service.log.LogReaderService;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Path("/")
@Component(service = SummaryService.class)
public class SummaryService {


    @Inject
    private LogReaderService logReaderService;

    @Inject
    private BundleContext bundleContext;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public SystemSummary getSystemSummary() {
        return new SystemSummary(
                new JvmProperties(),
                new BundleSummary(Arrays.stream(bundleContext.getBundles()).collect(toList())),
                new LogSummary(getLogs()));
    }

    public List<LogEntry> getLogs() {
        return Collections.list(logReaderService.getLog());
    }
}
