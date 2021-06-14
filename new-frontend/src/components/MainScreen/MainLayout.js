import React from "react";
import SideBar from "./SideBar";
import CameraScreen from "./CameraScreen";

export default function MainLayout() {
  const btnClick = (name) => {
    console.log("clicked", name);
  };

  const flexContainer = {
    display: "flex",
    margin: 0,
    padding: 0,
    backgroundColor: "#090e18",
  };

  const sideScreen = {
    // background: "#090e18",
    color: "#afb0b2",
    flex: 1,
    height: "98vh",
  };

  const cameraScreen = {
    background: "#3a414d",
    flex: 3,
    height: "98vh",
    color: "#afb0b2",
    borderRadius: "25px",
    margin: "1vh 1vh 1vh 0",
    overflow: "hidden",
  };

  return (
    <div style={flexContainer}>
      <div style={sideScreen}>
        <SideBar btnClick={btnClick} />
      </div>
      <div style={cameraScreen}>
        <VideoModal/>
        <CameraScreen />
      </div>
    </div>
  );
}

const VideoModal = () => {
  const videoStyle = {
    height: "100%",
    width: "100%",
    border: "none",
    position: "relative", 
    left: "-10px",
    top: "-10px",
  };

  return <iframe 
      style={videoStyle} 
      src={'http://127.0.0.1:5000/'} 
      scrolling={"no"}>
    </iframe>
}