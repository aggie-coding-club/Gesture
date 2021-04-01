import React from "react"
import Options from "./Options";
import CameraOption from "./CameraOption";


export default function SideBar({btnClick}) {

  const logo = {
    height: "10vh",
    paddingLeft: "1vw"
  }

  const optionStyle = {
    padding: "10vh 0 10vh 10vw",
  }


  return (


    <div>
      <div style={logo}>
        <p>VISIONS CONTROL</p>
      </div>
      <div style={optionStyle}>
        <Options btnClick={btnClick} name={"Settings"}/>
        <Options btnClick={btnClick} name={"Profile"}/>
        <Options btnClick={btnClick} name={"About"}/>
      </div>
      <div>
        <CameraOption btnClick={btnClick} />
      </div>



    </div>
  )
}
