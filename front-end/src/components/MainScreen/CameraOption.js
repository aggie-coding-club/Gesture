import React, { useState } from "react";

export default function CameraOption({btnClick, icon}) {
  const [visible, setVisible] = useState('http://localhost:5000/video_feed')

  function toggleChange() {
    if (visible == 'http://localhost:5000/video_feed')
      setVisible('http://localhost:5000/off')
    else
      setVisible('http://localhost:5000/video_feed')
  }

  const btnContainer = {
    padding: "10vh 0 10vh 0"
  }

  const btnStyle = {
    background: "#1250a4",
    color: "white",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    margin: "auto",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row"
  }

  const imageStyle = {
    backgroundColor: "#144586",
    padding: "1vh 1vw"
  }

  const wordStyle = {
    padding: "1vh 3vw"
  }

  const word = {
    marginTop: "1vh"
  }

  const videoStyle = {
    height: "480px",
    width: "640px",
    border: "none",
    position: "absolute",
    top: "5px",
    right: "5px",
    height: "98vh",
    borderRadius: "25px",
  };

  return(
    <React.Fragment>
        <div style={btnContainer}>
        <button style={btnStyle} onClick={toggleChange}>
          <div style={imageStyle}>
            <img src={icon} alt="camera" height="auto" width="25px"/>
          </div>
          <div style={wordStyle}>
            <p style={word}>Camera</p>
          </div>
        </button>
      </div>
      <div>
        <iframe 
          style={videoStyle} 
          src={visible} 
          scrolling={"no"}>
        </iframe>
      </div>
    </React.Fragment>
  )
}
