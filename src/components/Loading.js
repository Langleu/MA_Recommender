import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Loading() {
  return (
    <div className="columns is-centered" style={{marginTop: "100px"}}>
      <PropagateLoader size={15} color={"#23D160"} />
    </div>
  );
}
