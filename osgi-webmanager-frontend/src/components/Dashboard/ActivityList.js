import {
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckIcon from "@material-ui/icons/Check";
import React from "react";
import { useSelector } from "react-redux";
import { BUNDLE_STATES } from "../../utils/constants";
import RoundedCard from "./RoundedCard";

const renderActivities = (activities) => {
  if (!activities) {
    return [];
  }

  const sortByDate = (d1, d2) => new Date(d1) - new Date(d2);

  const mapActivityTypeToIcon = (type) => {
    switch (type) {
      case BUNDLE_STATES.INSTALLED:
      case BUNDLE_STATES.STARTING:
      case BUNDLE_STATES.STARTED:
        return <AddIcon />;
      case BUNDLE_STATES.STOPPING:
      case BUNDLE_STATES.STOPPED:
      case BUNDLE_STATES.UNINSTALLED:
        return <RemoveIcon />;
      default:
        return <CheckIcon />;
    }
  };

  return activities
    .sort((a1, a2) => sortByDate(a2.timestamp, a1.timestamp))
    .map((activity, idx) => (
      <ListItem key={idx}>
        <ListItemIcon>{mapActivityTypeToIcon(activity.type)}</ListItemIcon>
        <ListItemText primary={activity.text} secondary={activity.timestamp} />
      </ListItem>
    ));
};

const ActivityList = ({ className }) => {
  const bundles = useSelector((state) => state.bundles);
  const { activities } = bundles;
  console.log(activities);

  return (
    <RoundedCard elevation={4} className={className}>
      <CardContent>
        <Typography variant="h4">Activity</Typography>
        <List>{renderActivities(activities)}</List>
      </CardContent>
    </RoundedCard>
  );
};

export default ActivityList;
