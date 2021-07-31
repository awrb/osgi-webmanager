import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

const UpdateBundleModal = ({ open, handleClose, handleSubmit, bundleName }) => {
  const [file, setFile] = useState(null);
  const handleUpload = ({ target }) => setFile(target.files[0]);

  if (!bundleName) {
    return null;
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="update-bundle-dialog"
    >
      <DialogTitle id="update-bundle-dialog">{`Update ${bundleName}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select a JAR file that contains the new bundle version.
        </DialogContentText>
        <input hidden id="upload" onChange={handleUpload} type="file" />
        <label htmlFor="upload">
          <Button
            variant="contained"
            startIcon={<CloudUpload />}
            component="span"
          >
            Upload
          </Button>
        </label>
        <Typography>{file && file.name}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setFile(null);
            handleClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setFile(null);
            handleSubmit(file);
          }}
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateBundleModal;
