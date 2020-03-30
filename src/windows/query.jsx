import React from "react";
import { TextField } from '@material-ui/core';

function Searcher(props) {
  return (
    <div>
      <TextField id="outlined-search" size="small"
        value={props.text} onChange={props.query} label="Search" type="search" variant="outlined" />
    </div>
  );
}
export default Searcher;
