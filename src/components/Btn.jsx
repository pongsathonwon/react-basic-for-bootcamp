import React from "react";

function Btn({ btnRounded, btnLabel, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={btnRounded ? "rounded-btn" : "btn"}
    >
      {btnLabel}
    </button>
  );
}

export default Btn;
