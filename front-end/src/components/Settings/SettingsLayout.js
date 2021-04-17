import React, {useState} from 'react'
import TrickGesturesPairs from "./TrickGesturePairs";



export default function SettingsLayout() {
  const tricks = ["one", "two", "sit", "stand"]


  const settingsStyle = {
    backgroundColor: "#090e18",
    color: "#afb0b2",
    height: "100vh",
    padding: 0,
    margin: 0,
  }

  const titleStyle = {
    textAlign: "center",
  }

  const contentStyle = {
    display: "flex",
    backgroundColor: "white",
    textAlign: "center"
  }


  return (
    <div style={settingsStyle}>
      <div style={titleStyle}>
        <h1>SETTINGS</h1>
      </div>
      <div style={contentStyle}>
        <TrickGesturesPairs tricks={tricks}/>
      </div>
    </div>
  )
}
