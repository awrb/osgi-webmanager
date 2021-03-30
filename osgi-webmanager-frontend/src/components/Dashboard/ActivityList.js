import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import { Add, Stop } from "@material-ui/icons";
import React from "react";

const ActivityList = ({ className }) => {
  return (
    <Card className={className} variant="outlined">
      <CardContent>
        <Typography variant="h4">Activity</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText
              primary="Bundle X1 installed"
              secondary="Sun Mar 14 2021 17:42:15"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Stop />
            </ListItemIcon>
            <ListItemText
              primary="Bundle X2 stopped"
              secondary="Sun Mar 14 2021 17:42:15"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText
              primary="Bundle X3 installed"
              secondary="Sun Mar 14 2021 17:42:15"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText
              primary="Bundle X3 installed"
              secondary="Sun Mar 14 2021 17:42:15"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText
              primary="Bundle X4 installed"
              secondary="Sun Mar 14 2021 17:42:15"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText
              primary="Bundle X5 installed"
              secondary="Sun Mar 14 2021 17:42:15"
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ActivityList;
