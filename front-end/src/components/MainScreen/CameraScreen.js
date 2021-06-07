import React from 'react'
import CameraOff from '../../assets/camera-off.png'

export default function CameraScreen() {

  const camera = {

  }

  const cameraOffStyle = {
    height: "40vh",
    width: "auto",
    margin: "30vh 0 0 45vh",
    opacity: 0.4
  }

  return (
    <div style={camera}>
      <img style={cameraOffStyle} src={CameraOff}></img>
    </div>
  )
}
