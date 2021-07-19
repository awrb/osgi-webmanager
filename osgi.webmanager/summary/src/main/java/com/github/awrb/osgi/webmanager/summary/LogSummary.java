package com.github.awrb.osgi.webmanager.summary;

import com.github.awrb.osgi.webmanager.logs.representation.enums.LogLevelEnum;
import org.osgi.service.log.LogEntry;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class LogSummary {

    private long numOfLogs;
    private long numOfAlarmLogs;

    private float infoLogPercentage;
    private float alarmLogPercentage;
    private float warningLogPercentage;

    public LogSummary() {

    }

    public LogSummary(List<LogEntry> logEntries) {
        this.numOfLogs = logEntries.size();

        Map<Integer, Long> logsPerLevel = logEntries.stream()
                .collect(Collectors.groupingBy(LogEntry::getLevel, Collectors.counting()));
        this.numOfAlarmLogs = logsPerLevel.getOrDefault(LogLevelEnum.get(LogLevelEnum.LOG_ERROR), 0L);
        this.infoLogPercentage = (float) logsPerLevel.getOrDefault(LogLevelEnum.get(LogLevelEnum.LOG_INFO), 0L) / this.numOfLogs;
        this.alarmLogPercentage = (float) logsPerLevel.getOrDefault(LogLevelEnum.get(LogLevelEnum.LOG_ERROR), 0L) / this.numOfLogs;
        this.warningLogPercentage = (float) logsPerLevel.getOrDefault(LogLevelEnum.get(LogLevelEnum.LOG_WARNING), 0L) / this.numOfLogs;
    }

    public long getNumOfLogs() {
        return numOfLogs;
    }

    public long getNumOfAlarmLogs() {
        return numOfAlarmLogs;
    }

    public float getInfoLogPercentage() {
        return infoLogPercentage;
    }

    public float getAlarmLogPercentage() {
        return alarmLogPercentage;
    }

    public float getWarningLogPercentage() {
        return warningLogPercentage;
    }


    @Override
    public String toString() {
        return "LogSummary{" +
                "numOfLogs=" + numOfLogs +
                ", numOfAlarmLogs=" + numOfAlarmLogs +
                ", infoLogPercentage=" + infoLogPercentage +
                ", alarmLogPercentage=" + alarmLogPercentage +
                ", warningLogPercentage=" + warningLogPercentage +
                '}';
    }
}
