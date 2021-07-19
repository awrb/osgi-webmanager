import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";

const renderActivities = (activities) => {
  if (!activities) {
    return [];
  }

  console.log(activities);

  const sortByDate = (d1, d2) => new Date(d1) - new Date(d2);

  return activities
    .sort((a1, a2) => sortByDate(a2.timestamp, a1.timestamp))
    .map((activity) => (
      <ListItem>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary={activity.text} secondary={activity.timestamp} />
      </ListItem>
    ));
};

const ActivityList = ({ className }) => {
  const bundles = useSelector((state) => state.bundles);
  const { activities } = bundles;

  return (
    <Card className={className} variant="outlined">
      <CardContent>
        <Typography variant="h4">Activity</Typography>
        <List>{renderActivities(activities)}</List>
      </CardContent>
    </Card>
  );
};

export default ActivityList;
