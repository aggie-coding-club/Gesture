import React from 'react'
import CameraOff from '../../assets/camera-off.png'

export default function CameraScreen() {

  const cameraOffStyle = {
    height: "40vh",
    width: "auto",
    margin: "30vh 0 0 45vh",
    opacity: 0.4
  }

  return (
    <img style={cameraOffStyle} src={CameraOff}></img>
  )
}
