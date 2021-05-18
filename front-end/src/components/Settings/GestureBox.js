import React, {useState} from 'react'

export default function GestureBox({name, newSetting, redNum}) {
  // const [theBackground, setTheBackground] = useState("#081a2d")
  var theBackground;
  if(name === redNum) {
    theBackground = "#b81212"
  } else {
    theBackground ="#081a2d"
  }


  const innerGrid = {
    flex: 1,
    textAlign: "center",
    borderRight: "1px solid white",
    color: "white",
    background: theBackground,
  }

  const gestures = {
    padding: "5vh",
  }

  const imgFormat = {
    width: "auto",
    height: "3vh"
  }

  function handleClick() {
    newSetting(name)
  }

  if(!Number.isInteger(name)) {
    return (
      <div onClick={handleClick} style={innerGrid}>
        <div style={gestures}><img style={imgFormat} src={name}></img></div>
      </div>
    )
  } else {
    return (
      <div onClick={handleClick} style={innerGrid}>
        <div style={gestures}>-</div>
      </div>
    )
  }

}
