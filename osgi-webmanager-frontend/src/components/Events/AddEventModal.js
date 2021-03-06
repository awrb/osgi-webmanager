import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Fab, Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  fab: {
    marginTop: 8,
  },
}));

const AddEventModal = ({ open, handleClose, handleSubmit }) => {
  const [topic, setTopic] = useState("");
  const [keysAndValues, setKeysAndValues] = useState([]);

  const addKeyValuePair = () => {
    setKeysAndValues([...keysAndValues, { key: "", value: "" }]);
  };

  const setKey = (idx, value) => {
    setKeysAndValues(
      keysAndValues.map((keyValuePair, index) =>
        idx === index ? { ...keyValuePair, key: value } : keyValuePair
      )
    );
  };

  const setValue = (idx, value) => {
    setKeysAndValues(
      keysAndValues.map((keyValuePair, index) =>
        idx === index ? { ...keyValuePair, value } : keyValuePair
      )
    );
  };

  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="add-log-dialog"
    >
      <DialogTitle id="add-log-dialog">Send Event</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              label="Topic"
              type="text"
              fullWidth
            />
          </Grid>
          {keysAndValues.map((keyValuePair, idx) => {
            return (
              <React.Fragment>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    value={keyValuePair.key}
                    onChange={(e) => setKey(idx, e.target.value)}
                    label="Key"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    value={keyValuePair.value}
                    onChange={(e) => setValue(idx, e.target.value)}
                    label="Value"
                    type="text"
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <Fab className={classes.fab} color="primary" aria-label="add">
          <Add onClick={addKeyValuePair} />
        </Fab>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleSubmit(topic, keysAndValues)}
          color="primary"
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventModal;
