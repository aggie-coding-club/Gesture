import React from "react";

export default function MenuButtons() {
  const remote = require("electron").remote;

  const closeScreen = () => {
    var window = remote.getCurrentWindow();
    window.close();
  };

  const minimizeScreen = () => {
    var window = remote.getCurrentWindow();
    window.minimize();
  };

  const menuButtonStyle = {
    backgroundColor: "transparent",
    fontSize: 15,
    fontFamily: "Oxygen",
    fontWeight: "Bold",
    border: "none",
    outline: "none",
    cursor: "pointer",
    position: "relative",
    left: "17.5vw",
    top: "-7vh",
  };


  return (
    <div >
      <button style={menuButtonStyle} onClick={minimizeScreen}>
        —
      </button>
      <button style={menuButtonStyle} onClick={closeScreen}>
        X
      </button>
    </div>
  );
}
