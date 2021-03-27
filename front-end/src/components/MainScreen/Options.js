import React from "react"

export default function Options({name, btnClick}) {
  const anOptionStyle = {
    padding: "5vh 0 5vh 0"
  }

  function toggleChange() {
    btnClick(name);
  }
  return (
    <div style={anOptionStyle}>
      <button onClick={toggleChange}>{name}</button>

    </div>
  )
}


