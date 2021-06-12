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

  const videoStyle = {
    height: "500px",
    width: "100%",
    border: "none",
    overflow: "hidden"
  }

  return (
    <div style={camera}>
      <iframe style={videoStyle} src={'http://127.0.0.1:5000/'}></iframe>
      {/* <img style={cameraOffStyle} src={CameraOff}></img> */}
    </div>
  )
}
