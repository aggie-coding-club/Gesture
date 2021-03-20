import React from "react"
import SideBar from "./SideBar";
import CameraScreen from "./CameraScreen";

export default function MainLayout() {

  const flexContainer = {
    display: "flex",
    backgroundColor: "blue"
  }

  const sideScreen = {
    background: "#090e18",
    width: "20vw",
    height: "100vh",
    color: "#afb0b2"
  }
  const cameraScreen = {
    background: "#3c3740",
    width: "80vw",
    color: "#afb0b2"

  }

  return(
    <div style={flexContainer}>
      <div style={sideScreen}>
        <SideBar/>
      </div>
      <div style={cameraScreen}>
        <CameraScreen />
      </div>
    </div>
  )

}
