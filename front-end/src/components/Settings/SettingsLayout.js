import React from 'react'
import SideBar from "../MainScreen/SideBar";
import CameraScreen from "../MainScreen/CameraScreen";

export default function SettingsLayout() {
  const settingsStyle = {
    backgroundColor: "#090e18",
    color: "#afb0b2",
    height: "100vh",
    padding: 0,
    margin: 0
  }

  const titleStyle = {
    textAlign: "center"
  }

  return (
    <div style={settingsStyle}>
      <div style={titleStyle}>
        <h1>SETTINGS</h1>
      </div>
      <p>Ello?</p>
    </div>
  )
}
