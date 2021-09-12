import React, { useEffect } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import ActivityList from "./ActivityList";
import InfoCard from "./InfoCard";
import MemoryIcon from "@material-ui/icons/Memory";
import ComputerIcon from "@material-ui/icons/Computer";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
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
    borderRadius: 25,
  },
  cardIcon: { float: "right" },
  rounded: {
    borderRadius: 25,
    padding: "1vh",
    borderStyle: "solid",
    borderWidth: 1,
  },
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
  const formatMemory = (number) => `${Math.round(number / (1024 * 1024))}`;

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
            className={classes.rounded}
            chartTitle="Logs"
            labels={{ 0: "Info", 1: "Alarm", 2: "Warning" }}
            data={[
              { title: "Info", value: infoLogPct, color: "green" },
              { title: "Alarm", value: alarmLogPct, color: theme.alarm },
              { title: "Warning", value: warningLogPct, color: theme.warning },
            ]}
          />
        </Grid>
        <Grid item xs={2}>
          <ChartCard
            className={classes.rounded}
            chartTitle="Bundles"
            labels={{ 0: "Installed", 1: "Active", 2: "Stopped" }}
            data={[
              {
                title: "Installed",
                value: installedBundlePct,
                color: "yellow",
              },
              { title: "Active", value: activeBundlePct, color: "green" },
              { title: "Resolved", value: resolvedBundlePct, color: "blue" },
            ]}
          />
        </Grid>
        <Grid style={{ textAlign: "left", marginLeft: "3vh" }} item xs={5}>
          <Paper elevation={4} className={classes.rounded}>
            <Grid container>
              <Grid item>
                <MemoryIcon fontSize="large" style={{ marginTop: "1vh" }} />
              </Grid>
              <Grid item>
                <Typography variant="h3">Memory [MB]</Typography>
              </Grid>
            </Grid>
            <Divider style={{ marginTop: "2vh", marginBottom: "2vh" }} />
            {displayJvmSetting("Total", "totalMemory", formatMemory)}
            {displayJvmSetting("Free", "freeMemory", formatMemory)}
            {displayJvmSetting("Max", "maxMemory", formatMemory)}
          </Paper>
        </Grid>
        <Grid style={{ textAlign: "left" }} item xs={6}>
          <Paper elevation={4} className={classes.rounded}>
            <ComputerIcon fontSize="large" />
            <Divider />
            {displayJvmSetting("Active threads", "numOfActiveThreads")}
            {displayJvmSetting("Available processors", "availableProcessors")}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
