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

  const pairStyle = {
    margin: "0 5vw 0 5vw"
  }


  return (
    <div style={settingsStyle}>
      <div style={titleStyle}>
        <h1>SETTINGS</h1>
      </div>
      <div style={pairStyle}>
        <TrickGesturesPairs tricks={tricks}/>
      </div>
    </div>
  )
}
