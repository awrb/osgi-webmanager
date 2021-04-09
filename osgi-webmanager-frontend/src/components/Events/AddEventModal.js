import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem, Select } from "@material-ui/core";

const AddEventModal = ({ open, handleClose, handleSubmit }) => {
  const [text, setText] = useState("");

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="add-log-dialog"
    >
      <DialogTitle id="add-log-dialog">Send Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Topic"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(text)} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventModal;
