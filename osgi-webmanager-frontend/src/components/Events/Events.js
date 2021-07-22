import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { CircularProgress, Collapse, IconButton } from "@material-ui/core";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import AddEventModal from "./AddEventModal";
import { publishEvent } from "../../actions/events";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableTop: {
    display: "flex",
  },
  boldText: {
    fontWeight: 600,
  },
});

const useTableStyles = makeStyles({
  root: {
    margin: "3vh",
    maxWidth: "98%",
  },
  title: {
    margin: 16,
    padding: 10,
  },
});

const Row = (props) => {
  const { row } = props;
  console.log(row);
  const classes = useRowStyles();
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.event.topic}
        </TableCell>
        <TableCell align="right">
          <Typography>
            {row.event.properties && row.event.properties.timestamp}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h5" gutterBottom component="div">
                Properties
              </Typography>
              <Table size="small" aria-label="properties">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.boldText}>Key</TableCell>
                    <TableCell className={classes.boldText}>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.event.properties &&
                    Object.keys(row.event.properties).map((key) => (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {key}
                        </TableCell>
                        <TableCell>
                          {JSON.stringify(row.event.properties[key])}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Cell = ({ label, alignRight }) => (
  <TableCell align={alignRight ? "right" : "left"}>
    <Typography variant="h5">{label}</Typography>
  </TableCell>
);

export const Events = () => {
  const classes = useTableStyles();
  const dispatch = useDispatch();
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  const columns = ["Topic", "Timestamp"];

  const createColumns = () =>
    eventsData.events.sort((e1, e2) =>
      (e1.event.properties && e1.event.properties.timestamp) <
      (e2.event.properties && e2.event.properties.timestamp)
        ? 1
        : (e1.event.properties && e1.event.properties.timestamp) >
          (e2.event.properties && e2.event.properties.timestamp)
        ? -1
        : 0
    );

  const eventsData = useSelector((state) => state.events);

  console.log(eventsData);

  const toObject = (keyValuePairs) => {
    const properties = {};
    keyValuePairs.forEach(
      (keyValuePair) => (properties[keyValuePair.key] = keyValuePair.value)
    );
    return properties;
  };

  return (
    <React.Fragment>
      <AddEventModal
        open={addEventModalOpen}
        handleClose={() => setAddEventModalOpen(false)}
        handleSubmit={(topic, keyValuePairs) => {
          const properties = toObject(keyValuePairs);
          const data = { topic, properties };
          dispatch(publishEvent(data));
          setAddEventModalOpen(false);
        }}
      />
      <TableContainer className={classes.root} component={Paper}>
        <Box display="flex">
          <Box width="100%">
            <Typography className={classes.title} variant="h4">
              Events
            </Typography>
          </Box>
          <Box marginRight={2} flexShrink={0}>
            <IconButton
              onClick={() => setAddEventModalOpen(!addEventModalOpen)}
            >
              <Add fontSize="large" />
            </IconButton>
          </Box>
        </Box>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column, idx) => (
                <Cell key={column} label={column} alignRight={idx > 0} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {createColumns().map((row) => (
              <Row key={row.uuid} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Events;
