import React, {useState} from 'react'


export default function HandButtons() {

  const [borderClr, setBorderClr] = useState("none");

  function handleClick() {
    if(borderClr == "none") {
      setBorderClr("1px solid white");
    } else {
      //FIXME: once pick gesture, or click away, none
      setBorderClr("none");
    }

  }

  const btnStyle = {
    cursor: "pointer",
    border: borderClr,
    color: "#afb0b2",
    backgroundColor: "#162440",
    padding: "2vh 3vw",
    outline: "none",
    borderRadius: "10px"
  }

  return (
    <div>
      <button style={btnStyle} onClick={handleClick}> Button </button>
    </div>
  )
}
