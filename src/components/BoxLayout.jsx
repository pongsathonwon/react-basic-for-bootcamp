import React from "react";
import Btn from "./Btn";

function BoxLayout({
  frameLabel,
  clock,
  btnRounded,
  leftBtnProps,
  rightBtnProps,
}) {
  return (
    <div className="w-1/4 mx-auto p-4">
      <div className="flex flex-col items-center gap-2 ">
        <h2>{frameLabel}</h2>
        <div>{clock}</div>
      </div>
      <div className="btnWrapper flex justify-around">
        <Btn {...leftBtnProps} btnRounded={btnRounded} />
        <Btn {...rightBtnProps} btnRounded={btnRounded} />
      </div>
    </div>
  );
}

export default BoxLayout;
