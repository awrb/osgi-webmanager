import React, { useEffect } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import ActivityList from "./ActivityList";
import InfoCard from "./InfoCard";
import { Grid } from "@material-ui/core";
import ChartCard from "./ChartCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummary } from "../../actions/summary";
import summaryReducer from "../../reducers/summaryReducer";

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

  const fmt = (number) => Math.round(number * 100) / 100;

  const getLogPercentage = (label) =>
    (summary && summary.logSummary && fmt(summary.logSummary[label])) || 0;
  const getBundlePercentage = (label) =>
    (summary &&
      summary.bundleSummary &&
      fmt(summary.bundleSummary[label], 2)) ||
    0;

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
      </Grid>
    </div>
  );
};

export default Home;
