import React from "react"

export default function Options({name}) {
  const anOptionStyle = {
    padding: "5vh 0 5vh 0"
  }
  return (
    <div style={anOptionStyle}>
      <p>{name}</p>
    </div>
  )
}


