import React from "react";

function Upload(props) {
  return (
    <div className="uploader">
      <input type="file" onChange={props.file} name="file" />
      <button onClick={props.uploader}>upload</button>
      {/* <button onClick={create}>sync</button> */}
    </div>
  );
}
export default Upload;
