import React from "react"

export default function Options({name, btnClick, imagePic}) {
  const anOptionStyle = {
    padding: "2.5vh",
  }

  const btnStyle = {
    color: "#111111",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
  }

  const imageStyle = {
    padding: "0 10px 0 0",
    color: "#2f353b"
  }

  const tagNameStyle = {
    marginTop: "7px",
    float: "right",
    fontFamily: "Oxygen",
    fontWeight: "normal",
    fontSize: 14,
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


