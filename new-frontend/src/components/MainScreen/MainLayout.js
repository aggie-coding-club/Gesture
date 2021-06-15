import React from "react";
import SideBar from "./SideBar";

export default function MainLayout() {
  const remote = require('electron').remote;
  
  const btnClick = (name) => {
    console.log("clicked", name);
  };

  const flexContainer = {
    display: "flex",
    margin: 0,
    padding: 0,
    backgroundColor: "#ececec",
  };

  const sideScreen = {
    // color: "#afb0b2",
    backgroundColor: "#ececec",
    flex: 1,
    height: "100vh",
    opacity: 1,
  };

  const cameraScreen = {
    flex: 3,
    height: "98vh",
    color: "#afb0b2",
    borderRadius: "25px",
    margin: "1vh 1vh 1vh 0",
    overflow: "hidden",
  };

  const closeScreen = () => {
    var window = remote.getCurrentWindow();
    window.close(); 
  }

  const minimizeScreen = () => {
    var window = remote.getCurrentWindow();
    window.minimize(); 
  }

  const menuButtonStyle = {
    color: "#ececec",
    backgroundColor: "transparent",
    position: "relative",
    top: "-45vh",
    right: "4vh",
    margin: "1.5vh",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    fontFamily: "Oxygen",
  }

  return (
    <div style={flexContainer}>
      <div style={sideScreen}>
        <SideBar btnClick={btnClick} />
      </div>
      <div style={cameraScreen}></div>
        <button style={menuButtonStyle} onClick={minimizeScreen}>—</button>
        <button style={menuButtonStyle} onClick={closeScreen}>X</button>
    </div>
  );
}
