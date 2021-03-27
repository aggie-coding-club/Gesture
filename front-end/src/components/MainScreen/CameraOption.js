import React from "react"

export default function CameraOption({btnClick}) {
  function toggleChange() {
    btnClick("Camera");
  }

  const btnContainer = {
    padding: "5vh 0 5vh 5vw",
  }

  const btnStyle = {
    background: "#1250a4",
    color: "white",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    padding: "2vh 5vw",
    borderRadius: "10px"
  }

  return(
    <div style={btnContainer}>
      <button style={btnStyle} onClick={toggleChange}>Camera</button>
    </div>
  )
}
