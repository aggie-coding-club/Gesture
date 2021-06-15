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
    backgroundColor: "black",
  };

  const sideScreen = {
    backgroundColor: "#ececec",
    flex: 1,
    height: "100%",
  };

  const cameraScreen = {
    flex: 3,
    height: "98vh",
    color: "#afb0b2",
    margin: "1vh 1vh 1vh 0",
    overflow: "hidden",
  };

  // const closeScreen = () => {
  //   var window = remote.getCurrentWindow();
  //   window.close(); 
  // }

  // const minimizeScreen = () => {
  //   var window = remote.getCurrentWindow();
  //   window.minimize(); 
  // }

  // const menuButtonStyle = {
  //   color: "black",
  //   backgroundColor: "transparent",
  //   position: "relative",
  //   // top: "-45vh",
  //   // right: "3vh",
  //   margin: "1vh",
  //   border: "none",
  //   cursor: "pointer",
  //   fontSize: 16,
  //   fontFamily: "Oxygen",
  // }

  return (
    <div style={flexContainer}>
      <div style={cameraScreen}></div>
      <div style={sideScreen}>
        <SideBar btnClick={btnClick} />
      </div>
      {/* <button style={menuButtonStyle} onClick={minimizeScreen}>—</button>
      <button style={menuButtonStyle} onClick={closeScreen}>X</button> */}
    </div>
  );
}
