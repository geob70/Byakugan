import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { } from "@material-ui/icons";
import { } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  content: {
    margin: 10
  },
  title: {
    display: "flex",
    justifyContent: "center",
    padding: 30
  }
}));

function Reader(props) {
  const [file, setFile] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    setFile(props.data);
  }, [props.data]);
  return (<div className={classes.root}>
    <div className={classes.content}>
      <div className={classes.title}>
        <span>{props.title}</span>
      </div>
    </div>
    <div className={classes.content}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        {file.map(text => text)}
      </Grid>
    </div>
  </div>);
}
export default Reader;
