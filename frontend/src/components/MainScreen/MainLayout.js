import React from "react";
import SideBar from "./SideBar";
import MenuBar from "../MenuBar/MenuBar";
import camOff from "../../assets/camera-off.png";

export default function MainLayout() {
  const btnClick = (name) => {
    console.log("clicked", name);
  };

  const flexContainer = {
    display: "flex",
    backgroundColor: "grey",
  };

  const sideScreen = {
    backgroundColor: "#ececec",
    flex: 1,
    height: "100vh",
  };

  const cameraScreen = {
    flex: 3,
    height: "100vh",
    color: "#afb0b2",
    overflow: "hidden",
  };

  return (
    <div>
      <MenuBar />
      <div style={flexContainer}>
        <div style={cameraScreen}>
          <img src={camOff}></img>
        </div>
        <div style={sideScreen}>
          <SideBar btnClick={btnClick} />
        </div>
      </div>
    </div>
  );
}
