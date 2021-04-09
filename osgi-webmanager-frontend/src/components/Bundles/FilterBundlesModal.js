import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem, Select, DialogContentText } from "@material-ui/core";
import { BUNDLE_STATES } from "../../utils/constants";
import { useSelector } from "react-redux";

const FilterBundlesModal = ({ open, handleClose, handleSubmit }) => {
  const preferences = useSelector((state) => state.bundles.preferences);
  const [name, setName] = useState(preferences.name);
  const [bundleState, setBundleState] = useState(preferences.state);
  const [id, setId] = useState(preferences.id);

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="filter-bundles-dialog"
    >
      <DialogTitle id="filter-bundles-dialog">Filters</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter filters that will be used to search for specific bundles.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          type="text"
          fullWidth
        />
        <Select
          value={bundleState}
          onChange={(e) => setBundleState(e.target.value)}
        >
          {Object.keys(BUNDLE_STATES).map((key) => (
            <MenuItem key={key} value={BUNDLE_STATES[key]}>
              {key}
            </MenuItem>
          ))}
        </Select>
        <TextField
          autoFocus
          margin="dense"
          value={id}
          onChange={(e) => setId(e.target.value)}
          label="Id"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleSubmit(name, bundleState, id)}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterBundlesModal;
