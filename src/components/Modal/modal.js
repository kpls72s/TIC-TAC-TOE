import React from "react";
import "./modal.css";

function Modal({reset,keepGame}) {

    const continueHandle = () => {
        keepGame();
    }

    const resetHandle = () => {
        reset()
    }
  return (
    <div>
      <div className="finishBanner">
        <div className="messageBox">
          <button onClick={continueHandle}>Continue</button>
          <button onClick={resetHandle}>Reset Game</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
