import React from "react"
import SideBar from "./SideBar";
import CameraScreen from "./CameraScreen";

export default function MainLayout() {

  const flexContainer = {
    display: "flex",
    backgroundColor: "blue"
  }

  const sideScreen = {
    background: "grey",
    width: "20vw",
    height: "100vh"


  }
  const cameraScreen = {

    background: "green",
    width: "80vw"

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
