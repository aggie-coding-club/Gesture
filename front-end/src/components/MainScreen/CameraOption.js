import React from "react"

export default function CameraOption({btnClick, icon}) {
  function toggleChange() {
    btnClick("Camera");
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

  return(
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
  )
}
