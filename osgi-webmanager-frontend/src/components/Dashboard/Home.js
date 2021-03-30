import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import ActivityList from "./ActivityList";
import InfoCard from "./InfoCard";
import { Grid } from "@material-ui/core";
import ChartCard from "./ChartCard";

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
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Grid align="center" container spacing={4}>
        <Grid item xs={2}>
          <InfoCard label={"Logs"} number={400} />
        </Grid>
        <Grid item xs={2}>
          <InfoCard
            textColor={theme.alarm}
            className={classes.card}
            label={"Alarms"}
            number={199}
          />
        </Grid>
        <Grid item xs={2}>
          <InfoCard className={classes.card} label={"Bundles"} number={103} />
        </Grid>
        <Grid item xs={2}>
          <InfoCard className={classes.card} label={"Active"} number={98} />
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
          />
        </Grid>
        <Grid item xs={2}>
          <ChartCard
            chartTitle="Bundles"
            labels={{ 0: "Installed", 1: "Active", 2: "Stopped" }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
