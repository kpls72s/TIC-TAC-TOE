import React from "react";

function Multiply() {
  return (
    <>
      <svg className="d-none" height="100" width="100" role="img">
        <path
          className="circle"
          id="lineAB"
          d="M 40 70 l 30 -40"
          stroke="red"
          stroke-width="3"
        />
        <path
          className="circle"
          id="lineBC"
          d="M 40 30 l 30 40"
          stroke="red"
          stroke-width="3"
        />
      </svg>
    </>
  );
}

export default Multiply;
