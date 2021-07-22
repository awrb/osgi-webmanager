import React, { useEffect } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import ActivityList from "./ActivityList";
import InfoCard from "./InfoCard";
import { Grid, Paper, Typography } from "@material-ui/core";
import ChartCard from "./ChartCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummary } from "../../actions/summary";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  activityList: {
    marginLeft: "3vh",
    height: "40vh",
    textAlign: "left",
    overflow: "auto",
  },
  cardIcon: { float: "right" },
}));

const Home = () => {
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.summary);

  useEffect(() => {
    dispatch(fetchSummary());
  }, []);

  const classes = useStyles();
  const theme = useTheme();

  console.log(summary);

  const roundNumber = (number) => Math.round(number * 100) / 100;
  const formatMemory = (number) => `${Math.round(number / (1024 * 1024))}MB`;

  const getLogPercentage = (label) =>
    (summary && summary.logSummary && roundNumber(summary.logSummary[label])) ||
    0;
  const getBundlePercentage = (label) =>
    (summary &&
      summary.bundleSummary &&
      roundNumber(summary.bundleSummary[label], 2)) ||
    0;
  const getJvmProperty = (label) =>
    (summary && summary.jvmProperties && summary.jvmProperties[label]) || 0;

  const displayJvmSetting = (label, property, formatter = (s) => s) => (
    <Typography variant="h4" gutterBottom>
      {`${label}: `}
      {<b>{`${formatter(getJvmProperty(property))}`}</b>}
    </Typography>
  );

  const alarmLogPct = getLogPercentage("alarmLogPercentage");
  const infoLogPct = getLogPercentage("infoLogPercentage");
  const warningLogPct = getLogPercentage("warningLogPercentage");
  const activeBundlePct = getBundlePercentage("activePercent");
  const installedBundlePct = getBundlePercentage("installedPercent");
  const resolvedBundlePct = getBundlePercentage("resolvedPercent");

  return (
    <div className={classes.root}>
      <Grid align="center" container spacing={4}>
        <Grid item xs={2}>
          <InfoCard
            label={"Logs"}
            number={
              (summary && summary.logSummary && summary.logSummary.numOfLogs) ||
              0
            }
          />
        </Grid>
        <Grid item xs={2}>
          <InfoCard
            textColor={theme.alarm}
            className={classes.card}
            label={"Alarms"}
            number={
              (summary &&
                summary.logSummary &&
                summary.logSummary.numOfAlarmLogs) ||
              0
            }
          />
        </Grid>
        <Grid item xs={2}>
          <InfoCard
            className={classes.card}
            label={"Bundles"}
            number={
              (summary &&
                summary.bundleSummary &&
                summary.bundleSummary.numOfBundles) ||
              0
            }
          />
        </Grid>
        <Grid item xs={2}>
          <InfoCard
            className={classes.card}
            label={"Active"}
            number={
              (summary &&
                summary.bundleSummary &&
                summary.bundleSummary.numOfActiveBundles) ||
              0
            }
          />
        </Grid>
        <Grid item xs={2}>
          <InfoCard className={classes.card} label={"Events"} number={15} />
        </Grid>
        <Grid item xs={6}>
          <ActivityList className={classes.activityList} />
        </Grid>
        <Grid item xs={2}>
          <ChartCard
            chartTitle="Logs"
            labels={{ 0: "Info", 1: "Alarm", 2: "Warning" }}
            data={[
              { title: "Info", value: infoLogPct, color: "#E38627" },
              { title: "Alarm", value: alarmLogPct, color: "#C13C37" },
              { title: "Warning", value: warningLogPct, color: "#6A2135" },
            ]}
          />
        </Grid>
        <Grid item xs={2}>
          <ChartCard
            chartTitle="Bundles"
            labels={{ 0: "Installed", 1: "Active", 2: "Stopped" }}
            data={[
              {
                title: "Installed",
                value: installedBundlePct,
                color: "#E38627",
              },
              { title: "Active", value: activeBundlePct, color: "#C13C37" },
              { title: "Resolved", value: resolvedBundlePct, color: "#6A2135" },
            ]}
          />
        </Grid>
        <Grid style={{ textAlign: "left", marginLeft: "3vh" }} item xs={5}>
          <Paper style={{ padding: "1vh" }}>
            {displayJvmSetting("Total memory", "totalMemory", formatMemory)}
            {displayJvmSetting("Free memory", "freeMemory", formatMemory)}
            {displayJvmSetting("Max memory", "maxMemory", formatMemory)}
          </Paper>
        </Grid>
        <Grid style={{ textAlign: "left" }} item xs={6}>
          <Paper style={{ padding: "1vh" }}>
            {displayJvmSetting("Active threads", "numOfActiveThreads")}
            {displayJvmSetting("Available processors", "availableProcessors")}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
