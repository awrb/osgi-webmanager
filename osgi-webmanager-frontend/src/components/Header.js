import React, { useState } from "react";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import MessageIcon from "@material-ui/icons/Message";
import EventIcon from "@material-ui/icons/Event";
import HomeIcon from "@material-ui/icons/Home";
import FolderIcon from "@material-ui/icons/Folder";
import CodeIcon from "@material-ui/icons/Code";
import Notifications from "./Notifications";
import { useDispatch } from "react-redux";
import { toggleRpcModal } from "../actions/rpc";

const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: "#fff",
  },
  leftSide: {
    marginRight: "5%",
  },
  linkButton: {
    marginTop: 12,
  },
  activeButton: {
    marginTop: 12,
    color: "#002984",
  },
  bellIcon: {
    marginTop: 6,
    marginLeft: "auto",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [activeButtonId, setActiveButtonId] = useState(null);
  const dispatch = useDispatch();

  const buttons = [
    {
      icon: () => <HomeIcon />,
      to: "/home",
      label: "Home",
      id: 1,
    },
    {
      icon: () => <MessageIcon />,
      to: "/logs",
      label: "Logs",
      id: 2,
    },
    {
      icon: () => <FolderIcon />,
      to: "/bundles",
      label: "Bundles",
      id: 3,
    },
    {
      icon: () => <EventIcon />,
      to: "/events",
      label: "Events",
      id: 4,
    },
  ];

  return (
    <AppBar className={classes.background} position="static">
      <Toolbar>
        <Grid container spacing={4}>
          <Grid item>
            <Typography className={classes.leftSide} variant="h5">
              <Link to="/">OSGi WebManager</Link>
            </Typography>
          </Grid>
          {buttons.map((button) => {
            const isActive = button.id === activeButtonId;
            const variant = isActive ? "outlined" : "text";
            return (
              <Grid key={button.id} item>
                <IconButton
                  variant={variant}
                  className={
                    isActive ? classes.activeButton : classes.linkButton
                  }
                  component={Link}
                  onClick={() => setActiveButtonId(button.id)}
                  to={button.to}
                >
                  {button.icon()}
                  <Typography variant="button">{button.label}</Typography>
                </IconButton>
              </Grid>
            );
          })}
          <Grid item>
            <IconButton
              variant="outlined"
              className={classes.linkButton}
              onClick={() => dispatch(toggleRpcModal())}
            >
              {<CodeIcon />}
              <Typography variant="button">RPC</Typography>
            </IconButton>
          </Grid>
          <Grid className={classes.bellIcon} item>
            <Notifications />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
