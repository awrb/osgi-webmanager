import React, { useEffect, useState } from "react";
import Divider from "@material-ui/core/Divider";
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
import Loader from "../Loader";
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
import { Menu, MenuItem } from "@material-ui/core";
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
    borderRadius: 25,
    borderStyle: "solid",
    borderWidth: 1,
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                variant="h6"
                gutterBottom
              >{`Start Level: ${row.startLevel}`}</Typography>
              <Typography variant="h6" gutterBottom component="div">
                Headers
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography>Header</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>Value</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(row.headers).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        <Typography>{key}</Typography>
                      </TableCell>
                      <TableCell
                        style={{
                          overflow: "hidden",
                          wordWrap: "break-word",
                          maxWidth: "98%",
                        }}
                        align="right"
                      >
                        <Typography style={{ wordWrap: "break-word" }}>
                          {value}
                        </Typography>
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
    return <Loader />;
  }

  return (
    <React.Fragment>
      <FilterBundlesModal
        open={filterModalOpen}
        handleClose={() => setFilterModalOpen(false)}
        handleSubmit={(name, state, id, modifiedAfter) => {
          setFilterModalOpen(false);
          const params = createParams(name, id, state, modifiedAfter);
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

      <TableContainer className={classes.root} elevation={4} component={Paper}>
        <Box display="flex">
          <Box width="100%">
            <Typography className={classes.title} variant="h4">
              Bundles
            </Typography>
            <Divider />
          </Box>
          <Box marginRight={4} flexShrink={1}>
            <IconButton onClick={() => setFilterModalOpen(!filterModalOpen)}>
              <FilterList fontSize="large" />
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
            {bundlesData.bundles.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Bundles;
