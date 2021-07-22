import { Fab, Grid, makeStyles, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeRpcModal, fetchServices, performRpc } from "../../actions/rpc";

const useStyles = makeStyles(() => ({
  fab: {
    marginTop: 8,
  },
}));

const RpcModal = () => {
  const rpcModalOpen = useSelector((state) => state.rpc.modalOpen);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => dispatch(fetchServices()), []);

  const rpcData = useSelector((state) => state.rpc);
  const [service, setService] = useState("");
  const [method, setMethod] = useState("");
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

  const getRequestData = () => ({
    service,
    methodName: method,
    parameterTypes: keysAndValues.map((keyAndValue) => keyAndValue.key),
    parameterValues: keysAndValues.map((keyAndValue) => keyAndValue.value),
  });

  const close = () => dispatch(closeRpcModal());
  const invoke = () => dispatch(performRpc(getRequestData()));

  return (
    <Dialog
      fullWidth
      open={rpcModalOpen}
      onClose={close}
      aria-labelledby="add-log-dialog"
    >
      <DialogTitle id="add-log-dialog">Remote Procedure Invocation</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              value={service}
              onChange={(e) => setService(e.target.value)}
              label="Service class"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              label="Method name"
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
                    label="Argument type"
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
        <Button onClick={close} color="primary">
          Cancel
        </Button>
        <Button onClick={invoke} color="primary">
          Invoke
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RpcModal;
