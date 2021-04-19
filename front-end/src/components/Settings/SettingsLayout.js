import React, {useState} from 'react'
import TrickGesturesPairs from "./TrickGesturePairs";



export default function SettingsLayout() {
  const tricks = ["open chrome", "mute volume", "raise volume", "lower volume"]
  const defaultNum = [1, 2, 3, 4, 5, 6, 7, 8, 9] //FIXME: should be read from file


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
        <TrickGesturesPairs tricks={tricks} defaultNum={defaultNum}/>
      </div>
    </div>
  )
}
