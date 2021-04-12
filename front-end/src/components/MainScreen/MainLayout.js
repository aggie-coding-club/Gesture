import React from "react"
import SideBar from "./SideBar";
import CameraScreen from "./CameraScreen";

export default function MainLayout({btnClick}) {

  const flexContainer = {
    display: "flex",
    backgroundColor: "#090e18",

  }

  const sideScreen = {
    background: "#090e18",
    color: "#afb0b2",
    flex: 1,
    height: "98vh",

  }
  const cameraScreen = {
    background: "#3a414d",
    flex: 3,
    height: "98vh",
    color: "#afb0b2",
    borderRadius: "25px",
    margin: "1vh 1vh 1vh 0",
  }


  return(
    <div style={flexContainer}>
      <div style={sideScreen}>
        <SideBar btnClick={btnClick}/>
      </div>
      <div style={cameraScreen}>
          <CameraScreen />
      </div>
    </div>
  )

}
