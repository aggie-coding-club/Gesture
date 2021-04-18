import React, {useState} from 'react'

export default function GestureBox({name}) {
  const [theBackground, setTheBackground] = useState("#081a2d")

  const innerGrid = {
    flex: 1,
    textAlign: "center",
    borderRight: "1px solid white",
    color: "white",
    background: theBackground,
  }

  const gestures = {
    padding: "5vh"
  }

  function handleClick() {
    if(theBackground == "#081a2d") {
      setTheBackground("#2d0808");
    } else {
      setTheBackground("#081a2d")
    }
  }
  return (
    <div onClick={handleClick} style={innerGrid}>
      <div style={gestures}>{name}</div>
    </div>
  )
}
