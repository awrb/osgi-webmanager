import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLogs,
  publishLog,
  createParams,
  setPreferences,
} from "../../actions/logs";
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
import { IconButton } from "@material-ui/core";
import Loader from "../Loader";
import { Add, FilterList } from "@material-ui/icons";
import AddLogModal from "./AddLogModal";
import FilterLogsModal from "./FilterLogsModal";
import { LOG_TYPES } from "../../utils/constants";
import { theme } from "../App";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableTop: {
    display: "flex",
  },
});

const useTableStyles = makeStyles({
  root: {
    margin: "3vh",
    maxWidth: "98%",
    borderRadius: 25,
  },
  title: {
    margin: 16,
    padding: 10,
  },
});

const mapLogLevelToColor = (level) => {
  switch (level) {
    case LOG_TYPES.ERROR:
      return theme.alarm;
    case LOG_TYPES.WARNING:
      return theme.warning;
    default:
      return "#000";
  }
};

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const color = mapLogLevelToColor(row.level);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell></TableCell>
        <TableCell component="th" scope="row">
          {row.bundleId}
        </TableCell>
        <TableCell align="right">
          <Typography>{row.bundleName}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{row.level}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{row.timestamp}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography style={{ color }}>{row.message}</Typography>
        </TableCell>
        <TableCell style={{ color }} align="right">
          {row.exception}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={7}
        ></TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Cell = ({ label, alignRight }) => (
  <TableCell align={alignRight ? "right" : "left"}>
    <Typography variant="h5">{label}</Typography>
  </TableCell>
);

export const Logs = () => {
  const classes = useTableStyles();
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const columns = [
    "Bundle Id",
    "Bundle Name",
    "Level",
    "Timestamp",
    "Text",
    "Exception",
  ];

  const createColumns = () =>
    logsData.logs
      .map((logEntry) => ({
        bundleId: logEntry.bundle.bundleId,
        bundleName: logEntry.bundle.name,
        exception: logEntry.exception,
        level: logEntry.level,
        message: logEntry.message,
        timestamp: logEntry.timestamp,
      }))
      .sort((log1, log2) =>
        log1.timestamp < log2.timestamp
          ? 1
          : log1.timestamp > log2.timestamp
          ? -1
          : 0
      );

  const dispatch = useDispatch();
  const logsData = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(fetchLogs(logsData.preferences));
  }, []);

  if (logsData.loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <AddLogModal
        open={logModalOpen}
        handleClose={() => setLogModalOpen(false)}
        handleSubmit={(message, level) => {
          dispatch(publishLog({ message, level }));
          setLogModalOpen(false);
        }}
      />
      <FilterLogsModal
        open={filterModalOpen}
        handleClose={() => setFilterModalOpen(false)}
        handleSubmit={(message, logLevel, exceptionsOnly) => {
          setFilterModalOpen(false);
          const params = createParams(10, message, logLevel, exceptionsOnly);
          dispatch(fetchLogs(params));
          dispatch(setPreferences(params));
        }}
      />
      <TableContainer className={classes.root} component={Paper} elevation={4}>
        <Box display="flex">
          <Box width="100%">
            <Typography className={classes.title} variant="h4">
              Logs
            </Typography>
          </Box>
          <Box marginRight={4} flexShrink={1}>
            <IconButton onClick={() => setFilterModalOpen(!filterModalOpen)}>
              <FilterList fontSize="large" />
            </IconButton>
          </Box>
          <Box marginRight={2} flexShrink={0}>
            <IconButton onClick={() => setLogModalOpen(!logModalOpen)}>
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
            {createColumns().map((row, idx) => (
              <Row key={idx} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Logs;
