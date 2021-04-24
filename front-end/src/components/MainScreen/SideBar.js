import React from "react"
import Options from "./Options";
import CameraOption from "./CameraOption";
import { Link } from "react-router-dom";


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
          <Link to="/settings">
            <Options btnClick={btnClick} name={"Settings"}/>
          </Link>
          <Link to="">
            <Options btnClick={btnClick} name={"Profile"}/>
          </Link>
          <Link to="">
            <Options btnClick={btnClick} name={"About"}/>
          </Link>
          
          
        </div>
        <div style={cameraOptionStyle}>
          <CameraOption btnClick={btnClick} />
        </div>
      </div>



    </div>
  )
}
