import React from "react"
import Options from "./Options";
import CameraOption from "./CameraOption";
import { Link } from "react-router-dom";
import settingsPic from "../../assets/settings.png"
import profilePic from  "../../assets/profile.png"
import aboutPic from "../../assets/about.png"


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
            <Options btnClick={btnClick} name={"Settings"} imagePic={settingsPic}/>
          </Link>
          <Link to="">
            <Options btnClick={btnClick} name={"Profile"} imagePic={profilePic}/>
          </Link>
          <Link to="">
            <Options btnClick={btnClick} name={"About"} imagePic={aboutPic}/>
          </Link>


        </div>
        <div style={cameraOptionStyle}>
          <CameraOption btnClick={btnClick} />
        </div>
      </div>



    </div>
  )
}
