import React from "react";
import HandButtons from "./HandButtons";

export default function TrickGesturePair({ dat, changeSettings }) {
  const contentStyle = {
    display: "flex",
    textAlign: "center",
    padding: "2vh 2vw",

    borderBottom: "1px solid gray",
  };

  const trickContainer = {
    flex: 1,
    margin: "0vh 0vh 0vh 10vh",
    WebkitAppRegion: "no-drag",
  };

  const handButtonsStyle = {
    flex: 1,
    margin: "0vh 0vh 0vh 0vh",
  };

  return (
    <div style={contentStyle}>
      <div style={trickContainer}>{dat[0]}</div>
      <div style={handButtonsStyle}>
        <HandButtons dat={dat} changeSettings={changeSettings} />
      </div>
    </div>
  );
}
