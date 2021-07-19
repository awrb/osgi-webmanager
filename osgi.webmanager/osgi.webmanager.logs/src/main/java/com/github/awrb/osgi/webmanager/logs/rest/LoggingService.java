package com.github.awrb.osgi.webmanager.logs.rest;

import com.github.awrb.osgi.webmanager.logs.representation.LogPublicationRequest;
import com.github.awrb.osgi.webmanager.logs.representation.enums.LogLevelEnum;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.log.LogEntry;
import org.osgi.service.log.LogReaderService;
import org.osgi.service.log.LogService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collections;
import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * This class retrieves historical logs from the OSGi environment.
 */
@Path("/")
@Component(service = LoggingService.class)
public class LoggingService {


    @Inject
    private LogReaderService logReaderService;
    @Inject
    private LogService logService;

    @Activate
    public void activate() {
        logService.log(LogService.LOG_INFO, "@@@@@");
    }

    /**
     * Returns historical log entries.
     *
     * @param limit          maximum number of entries to return, defaults to 0
     * @param filter         filter by the content of a log ({@link LogEntry#getMessage()}, defaults to null
     * @param exceptionsOnly whether to filter for logs that reported an exception, defaults to false
     * @return list of {@link LogEntry}
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<LogEntry> getLogs(@QueryParam("limit") int limit,
                                  @DefaultValue("") @QueryParam("filter") String filter,
                                  @DefaultValue("ALL") @QueryParam("level") LogLevelEnum logLevelEnum,
                                  @QueryParam("exceptionsOnly") boolean exceptionsOnly) {
        int logLevel = LogLevelEnum.get(logLevelEnum);
        List<LogEntry> logs = Collections.list(logReaderService.getLog());
        return logs.stream()
                .filter(logEntry -> filter.isEmpty() || safeContains(logEntry, filter))
                .filter(logEntry -> logLevelEnum == LogLevelEnum.ALL || logEntry.getLevel() == logLevel)
                .filter(logEntry -> !exceptionsOnly || logEntry.getException() != null)
                .collect(toList());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void logMessage(LogPublicationRequest request) {
        logService.log(LogLevelEnum.get(request.getLevel()), request.getMessage());
    }

    private boolean safeContains(LogEntry logEntry, String filter) {
        return logEntry != null
                && logEntry.getMessage() != null
                && logEntry.getMessage().toLowerCase().contains(filter.toLowerCase());
    }
}
