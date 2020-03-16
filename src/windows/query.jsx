import React from "react";

function Searcher(props) {
  return (
    <div>
      <input type="text" onChange={props.query} name="query" />
    </div>
  );
}
export default Searcher;
