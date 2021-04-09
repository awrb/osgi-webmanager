import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Checkbox,
  Box,
  FormControlLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { LOG_TYPES } from "../../utils/constants";
import { useSelector } from "react-redux";

const FilterLogsModal = ({ open, handleClose, handleSubmit }) => {
  const preferences = useSelector((state) => state.logs.preferences);
  const [text, setText] = useState(preferences.filter);
  const [type, setType] = useState(preferences.level);
  const [exceptionsOnly, setExceptionsOnly] = useState(
    preferences.exceptionsOnly
  );

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="filter-log-dialog"
    >
      <DialogTitle id="filter-log-dialog">Set Log Filters</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Text"
          type="text"
          fullWidth
        />
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          {Object.keys(LOG_TYPES).map((key) => (
            <MenuItem key={key} value={LOG_TYPES[key]}>
              {key}
            </MenuItem>
          ))}
        </Select>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={exceptionsOnly}
                onChange={(e) => setExceptionsOnly(e.target.checked)}
              />
            }
            label="Exceptions only"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleSubmit(text, type, exceptionsOnly)}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterLogsModal;
