//@ts-check
/**@module */
import React from "react";

/**@function Jumbotron */
function Jumbotron({ children }) {
  return (
    <div
      style={{ backgroundColor: "teal", height: 100, clear: "both", paddingTop: 25, textAlign: "center", fontSize: "1.6em" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
