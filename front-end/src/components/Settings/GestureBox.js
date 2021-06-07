import React, { useState } from "react";

export default function GestureBox({ name, newSetting, redNum }) {
  // const [theBackground, setTheBackground] = useState("#081a2d")
  var theBackground;
  if (name === redNum) {
    theBackground = "#967223";
  } else {
    theBackground = "#081a2d";
  }

  const innerGrid = {
    flex: 1,
    textAlign: "center",
    borderRight: "1px solid white",
    color: "white",
    background: theBackground,
  };

  const gestures = {
    padding: "4vh",
  };

  const imgFormat = {
    width: "auto",
    height: "4vh",
  };

  function handleClick() {
    newSetting(name);
  }

  return (
    <div onClick={handleClick} style={innerGrid}>
      <div style={gestures}>
        <img style={imgFormat} src={name}></img>
      </div>
    </div>
  );
}
