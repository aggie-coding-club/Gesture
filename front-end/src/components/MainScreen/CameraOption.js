import React from "react"

export default function CameraOption({btnClick}) {
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
    padding: "2vh 5vw",
    margin: "auto",
    borderRadius: "10px"
  }

  return(
    <div style={btnContainer}>
      <button style={btnStyle} onClick={toggleChange}>Camera</button>
    </div>
  )
}
