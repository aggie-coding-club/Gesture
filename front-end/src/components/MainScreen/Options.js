import React from "react"

export default function Options({name, btnClick, imagePic}) {
  const anOptionStyle = {
    padding: "2.5vh",
   // backgroundColor: "red",
    //margin: "10px 0 ",
   // flex: 1,

  }

  const btnStyle = {
    color: "white",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
  }

  const imageStyle = {
    padding: "0 10px 0 0",
  }

  const tagNameStyle = {
    marginTop: "10px",
    float: "right"
  }

  function toggleChange() {
    btnClick(name);
  }
  return (
    <div style={anOptionStyle}>

      <button style={btnStyle} onClick={toggleChange}>
        <img src={imagePic} alt={name} width="30px" height="30px" style={imageStyle}/>
        <div style={tagNameStyle}>
          {name}
        </div>
      </button>

    </div>
  )
}


