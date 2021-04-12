import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { FilterList } from "@material-ui/icons";
import {
  fetchBundles,
  stopBundle,
  startBundle,
  setPreferences,
  createParams,
  selectBundle,
  dismissBundle,
  updateBundle,
} from "../../actions/bundles";

import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Menu, MenuItem } from "@material-ui/core";
import FilterBundlesModal from "./FilterBundlesModal";
import UpdateBundleModal from "./UpdateBundleModal";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const classes = useRowStyles();

  const handleClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <TableRow
        onContextMenu={(e) => {
          e.preventDefault();
          setAnchorEl(e.currentTarget);
        }}
        className={classes.root}
      >
        <Menu
          id="bundle-menu"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <MenuItem onClick={() => dispatch(stopBundle(row.id))}>Stop</MenuItem>
          <MenuItem onClick={() => dispatch(startBundle(row.id))}>
            Start
          </MenuItem>
          <MenuItem onClick={() => dispatch(selectBundle(row))}>
            Update
          </MenuItem>
        </Menu>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.state}</TableCell>
        <TableCell align="right">{row.lastModified}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
      </TableRow>
      <TableRow>
        {/* TODO zamiast zahardkodowanego 7 powinien byc props */}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
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
  <TableCell align={alignRight ? "right" : ""}>
    <Typography variant="h5">{label}</Typography>
  </TableCell>
);

export const Bundles = () => {
  const classes = useTableStyles();
  const columns = ["Id", "Name", "State", "Last Modified", "Description"];
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const dispatch = useDispatch();
  const bundlesData = useSelector((state) => state.bundles);

  const { selectedBundle } = bundlesData;

  useEffect(() => {
    dispatch(fetchBundles(bundlesData.preferences));
  }, []);

  if (bundlesData.loading) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
      <FilterBundlesModal
        open={filterModalOpen}
        handleClose={() => setFilterModalOpen(false)}
        handleSubmit={(name, state, id) => {
          setFilterModalOpen(false);
          const params = createParams(name, id, state);
          dispatch(fetchBundles(params));
          dispatch(setPreferences(params));
        }}
      />
      <UpdateBundleModal
        open={Boolean(selectedBundle)}
        handleClose={() => dispatch(dismissBundle())}
        handleSubmit={(file) => {
          dispatch(updateBundle(selectedBundle.id, file));
          dispatch(dismissBundle());
        }}
        bundleName={selectedBundle && selectedBundle.name}
      />

      <TableContainer className={classes.root} component={Paper}>
        <Box display="flex">
          <Box width="100%">
            <Typography className={classes.title} variant="h4">
              Bundles
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
            {bundlesData.bundles.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

export default Bundles;
