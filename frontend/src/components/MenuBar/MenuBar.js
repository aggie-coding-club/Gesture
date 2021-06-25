import React from "react";
import close from "../../assets/close.png";
import minimize from "../../assets/min.png";
import "./MenuBar.css";

export default function MenuBar() {
  const remote = require("electron").remote;

  const closeScreen = () => {
    var window = remote.getCurrentWindow();
    window.close();
  };

  const minimizeScreen = () => {
    var window = remote.getCurrentWindow();
    window.minimize();
  };

  const barStyle = {
    display: "block",
    height: "32px",
    background: "#CCCCCC",
  };

  const dragStyle = {
    width: "100%",
    height: "32px",
    WebkitAppRegion: "drag",
  };

  const iconStyle = {
    position: "relative",
    top: "2px",
    height: "10px",
  };

  return (
    <header style={barStyle}>
      <div style={dragStyle}>
        <div id="window-controls">
          <div class="button" id="min-button" onClick={minimizeScreen}>
            <img style={iconStyle} src={minimize} class="icon" draggable="false" />
          </div>
          <div class="button" id="close-button" onClick={closeScreen}>
            <img style={iconStyle} src={close} class="icon" draggable="false" />
          </div>
        </div>
      </div>
    </header>
  );
}
