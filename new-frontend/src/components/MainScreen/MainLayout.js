import React from "react";
import SideBar from "./SideBar";

export default function MainLayout() {
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
    height: "100vh",
  };

  const cameraScreen = {
    flex: 3,
    height: "98vh",
    color: "#afb0b2",
    margin: "1vh 1vh 1vh 0",
    overflow: "hidden",
  };

  return (
    <div style={flexContainer}>
      <div style={cameraScreen}></div>
      <div style={sideScreen}>
        <SideBar btnClick={btnClick} />
      </div>
    </div>
  );
}
