import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function Upload(props) {
  const classes = useStyles();
  return (
    <div className="uploader">
      <input type="file" onChange={props.file} name="file" />
      <Button
        variant="contained"
        onClick={props.uploader}
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
    </div>
  );
}
export default Upload;
