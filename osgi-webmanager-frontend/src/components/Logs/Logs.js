import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs, publishLog, createParams } from "../../actions/logs";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { CircularProgress, IconButton } from "@material-ui/core";
import { Add, FilterList } from "@material-ui/icons";
import AddLogModal from "./AddLogModal";
import FilterLogsModal from "./FilterLogsModal";

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
  },
  title: {
    margin: 16,
    padding: 10,
  },
});

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell></TableCell>
        <TableCell component="th" scope="row">
          {row.bundleId}
        </TableCell>
        <TableCell align="right">{row.bundleName}</TableCell>
        <TableCell align="right">{row.level}</TableCell>
        <TableCell align="right">{row.timestamp}</TableCell>
        <TableCell align="right">{row.message}</TableCell>
        <TableCell align="right">{row.exception}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody></TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const Cell = ({ label, alignRight }) => (
  <TableCell align={alignRight ? "right" : ""}>
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
    logsData.logs.map((logEntry) => ({
      bundleId: logEntry.bundle.bundleId,
      bundleName: logEntry.bundle.name,
      exception: logEntry.exception,
      level: logEntry.level,
      message: logEntry.message,
      timestamp: logEntry.timestamp,
    }));

  const dispatch = useDispatch();
  const logsData = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(fetchLogs());
  }, []);

  if (logsData.loading) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
      <AddLogModal
        open={logModalOpen}
        handleClose={() => setLogModalOpen(false)}
        handleSubmit={(message, level) => {
          dispatch(publishLog({ message, level }));
          setLogModalOpen(false);
          dispatch(fetchLogs());
        }}
      />
      <FilterLogsModal
        open={filterModalOpen}
        handleClose={() => setFilterModalOpen(false)}
        handleSubmit={(message, logLevel, exceptionsOnly) => {
          setFilterModalOpen(false);
          dispatch(
            fetchLogs(createParams(20, message, logLevel, exceptionsOnly))
          );
        }}
      />
      <TableContainer className={classes.root} component={Paper}>
        <Box display="flex">
          <Box width="100%">
            <Typography className={classes.title} variant="h4">
              Logs
            </Typography>
          </Box>
          <Box marginRight={4} flexShrink={1}>
            <IconButton>
              <FilterList
                onClick={() => setFilterModalOpen(!filterModalOpen)}
                fontSize="large"
              />
            </IconButton>
          </Box>
          <Box marginRight={2} flexShrink={0}>
            <IconButton>
              <Add
                onClick={() => setLogModalOpen(!logModalOpen)}
                fontSize="large"
              />
            </IconButton>
          </Box>
        </Box>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column, idx) => (
                <Cell label={column} alignRight={idx > 0} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {createColumns().map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Logs;
