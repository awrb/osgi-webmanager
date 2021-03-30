import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem, Select } from "@material-ui/core";
import { LOG_TYPES } from "../../utils/constants";

const AddLogModal = ({ open, handleClose, handleSubmit }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState(LOG_TYPES.INFO);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="add-log-dialog"
    >
      <DialogTitle id="add-log-dialog">Send Log</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(text, type)} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLogModal;
