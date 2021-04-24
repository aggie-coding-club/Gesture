import React from "react"

export default function Options({name, btnClick, imagePic}) {
  const anOptionStyle = {
    padding: "5vh 0 5vh 0",
  }

  const btnStyle = {
    color: "white",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
  }

  function toggleChange() {
    btnClick(name);
  }
  return (
    <div style={anOptionStyle}>
      <img src={imagePic} alt={name} width="30px" height="30px"/>
      <button style={btnStyle} onClick={toggleChange}>{name}</button>

    </div>
  )
}


