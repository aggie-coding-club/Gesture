import React from "react"
import Options from "./Options";
import CameraOption from "./CameraOption";


export default function SideBar({btnClick}) {

  const logo = {
    height: "10vh",
    paddingLeft: "1vw"
  }

  const optionWrapper = {
    display: "flex",
    flexDirection: "column",

    margin: "10vh 0 10vh 0",
    alignItems: "center"
  }
  const optionStyle = {
    flex: 1,

  }
  const cameraOptionStyle = {
    flex: 3,
  }

  return (


    <div>
      <div style={logo}>
        <p>VISIONS CONTROL</p>
      </div>
      <div style={optionWrapper}>
        <div style={optionStyle}>
          <Options btnClick={btnClick} name={"Settings"}/>
          <Options btnClick={btnClick} name={"Profile"}/>
          <Options btnClick={btnClick} name={"About"}/>
        </div>
        <div style={cameraOptionStyle}>
          <CameraOption btnClick={btnClick} />
        </div>
      </div>



    </div>
  )
}
