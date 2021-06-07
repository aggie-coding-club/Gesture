import React from "react";
import HandButtons from "./HandButtons";

export default function TrickGesturePair({ dat, changeSettings }) {
  let trick = dat[0];
  const contentStyle = {
    display: "flex",
    textAlign: "center",
    padding: "2vh 10vh",

    borderBottom: "1px solid gray",
  };

  const trickContainer = {
    flex: 1,
  };

  const tricksStyle = {
    margin: "auto",
    padding: "3vh 3vw",
    color: "white",
    fontFamily: "Oxygen",
    fontWeight: "normal",
    fontStyle: "italic",
    fontSize: 13,
  };

  const handButtonsStyle = {
    flex: 1,
  };

  return (
    <div style={contentStyle}>
      <div style={trickContainer}>
        <div style={tricksStyle}>{trick}</div>
      </div>
      <div style={handButtonsStyle}>
        <HandButtons dat={dat} changeSettings={changeSettings} />
      </div>
    </div>
  );
}
