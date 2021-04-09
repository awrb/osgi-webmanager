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
import { CircularProgress, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import AddEventModal from "./AddEventModal";

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
          {row.topic}
        </TableCell>
        <TableCell align="right">
          <Typography>{row.timestamp}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={3}
        ></TableCell>
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

export const Events = () => {
  const classes = useTableStyles();
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  const columns = ["Topic", "Timestamp"];

  const createColumns = () =>
    eventsData.events.sort((e1, e2) =>
      e1.timestamp < e2.timestamp ? 1 : e1.timestamp > e2.timestamp ? -1 : 0
    );

  const eventsData = useSelector((state) => state.events);

  return (
    <React.Fragment>
      <AddEventModal
        open={addEventModalOpen}
        handleClose={() => setAddEventModalOpen(false)}
      />
      <TableContainer className={classes.root} component={Paper}>
        <Box display="flex">
          <Box width="100%">
            <Typography className={classes.title} variant="h4">
              Events
            </Typography>
          </Box>
          <Box marginRight={2} flexShrink={0}>
            <IconButton>
              <Add
                onClick={() => setAddEventModalOpen(!addEventModalOpen)}
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
              <Row key={row} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Events;
