import React, { useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Checkbox,
  ListItemSecondaryAction,
  useTheme,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationActiveIcon from "@material-ui/icons/NotificationsActive";
import { useDispatch, useSelector } from "react-redux";
import { clearReadNotifications, readNotification } from "../actions/logs";

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const alarms = useSelector((state) => state.logs.alarms);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(clearReadNotifications());
  };

  const handleToggle = (idx) => {
    dispatch(readNotification(idx));
  };

  const renderNotifications = () => {
    return alarms.map((notification, idx) => (
      <MenuItem key={idx}>
        <ListItem onClick={handleClose}>
          {notification.message}
          <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              color="primary"
              onChange={() => {
                notification.checked = true;
                handleToggle(idx);
              }}
              checked={notification.checked}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </MenuItem>
    ));
  };

  return (
    <React.Fragment>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(e) => handleClick(e)}
      >
        {alarms && alarms.length > 0 ? (
          <NotificationActiveIcon style={{ color: theme.alarm }} />
        ) : (
          <NotificationsIcon />
        )}
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>{alarms && renderNotifications()}</List>
      </Menu>
    </React.Fragment>
  );
};

export default Notifications;
