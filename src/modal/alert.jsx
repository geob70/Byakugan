import React from "react";
import { Alert } from "@material-ui/lab";
import { Dialog } from "@material-ui/core";

function AlertInfo(props) {
  return (
    <Dialog
      open={props.visible}
      onClose={props.action}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">Title</DialogTitle> */}
      {/* <DialogContent> */}
      {/* <DialogContentText id="alert-dialog-description"> */}
      <Alert id="alert-dialog-description" severity={props.state}>
        {/* <AlertTitle>{props.state}</AlertTitle> */}
        {props.message}
      </Alert>
      {/* </DialogContentText> */}
      {/* </DialogContent> */}
    </Dialog>
  );
}
export default AlertInfo;
