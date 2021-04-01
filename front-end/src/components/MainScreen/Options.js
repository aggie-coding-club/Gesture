import React from "react"

export default function Options({name, btnClick}) {
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
      <button style={btnStyle} onClick={toggleChange}>{name}</button>

    </div>
  )
}


