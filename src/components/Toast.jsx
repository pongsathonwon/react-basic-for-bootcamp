import React from "react";

function Toast({ onClick }) {
  return (
    <div className="bg-smoke bg-opacity-40 p-8 h-screen w-screen absolute z-10 flex justify-center">
      <button className="btn max-h-[34px]" onClick={onClick}>
        stop
      </button>
    </div>
  );
}

export default Toast;
