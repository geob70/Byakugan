import React from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function AlertInfo(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar open={props.visible} autoHideDuration={6000} onClose={props.action}>
        <Alert onClose={props.action} severity={props.state}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default AlertInfo;
