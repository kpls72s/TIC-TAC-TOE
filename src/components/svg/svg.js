import React, { useEffect } from 'react'

let shapes = (
    <>
      {" "}
      <svg className="d-none" height="100" width="100">
        <circle
          className="circle"
          cx="46"
          cy="50"
          r="20"
          fill="none"
          stroke="red"
          strokeWidth="3"
        />
      </svg>
      <svg className="d-none" height="100" width="100" role="img">
        <path
          className="circle"
          id="lineAB"
          d="M 28 70 l 30 -40"
          stroke="red"
          strokeWidth="3"
        />
        <path
          className="circle"
          id="lineBC"
          d="M 28 30 l 30 40"
          stroke="red"
          strokeWidth="3"
        />
      </svg>
    </>
  );

function Svg({handler,refresh}) {

      return (
        <>
          <div className="grid-container" id="container">
           <div data-player="" data-x="0" data-y="0" className="grid-item" onClick={handler}>
             {shapes}
           </div>
           <div data-player=""  data-x="0"  data-y="1" className="grid-item" onClick={handler}>
             {shapes}
           </div>
           <div data-player=""  data-x="0"  data-y="2"  className="grid-item" onClick={handler}>
             {shapes}
           </div>
           <div data-player=""  data-x="1" data-y="0"  className="grid-item" onClick={handler}>
             {shapes}
           </div>
           <div  data-player="" data-x="1" data-y="1"  className="grid-item" onClick={handler}>
             {shapes}
           </div>
           <div data-player=""  data-x="1" data-y="2"  className="grid-item" onClick={handler}>
             {shapes}
           </div>
           <div  data-player="" data-x="2" data-y="0"  className="grid-item" onClick={handler}>
             {shapes}
           </div>
           <div  data-player="" data-x="2" data-y="1"  className="grid-item" onClick={handler}>
             {shapes}
           </div>
           <div data-player=""  data-x="2" data-y="2"  className="grid-item" onClick={handler}>
             {shapes}
           </div>
          </div>
        </>
    )
}

export default Svg
