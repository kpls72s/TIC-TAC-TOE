import React from "react";

function Circle() {
  return (
    <>
      <svg className="d-none" height="100" width="100">
        <circle
          className="circle"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="red"
          strokeWidth="3"
        />
      </svg>{" "}
    </>
  );
}

export default Circle;
