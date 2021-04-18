import React, {useState} from 'react'

export default function GestureBox({name, newSetting}) {
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
      setTheBackground("#b81212");
    } else {
      setTheBackground("#081a2d")
    }

    newSetting(name)
  }
  return (
    <div onClick={handleClick} style={innerGrid}>
      <div style={gestures}>{name}</div>
    </div>
  )
}
