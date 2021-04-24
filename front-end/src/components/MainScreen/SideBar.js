import React from "react"
import Options from "./Options";
import CameraOption from "./CameraOption";
import { Link } from "react-router-dom";
import settingsPic from "../../assets/settings.png"
import profilePic from  "../../assets/profile.png"
import aboutPic from "../../assets/about.png"
import logo from "../../assets/logo.png"
import cameraPic from "../../assets/webcam.png"


export default function SideBar({btnClick}) {

  const logoStyle = {
    height: "10vh",
    paddingLeft: "1vw"
  }

  const optionWrapper = {
    display: "flex",
    flexDirection: "column",

    margin: "10vh 5vw",

  }
  const optionStyle = {
    flex: 1,

  }
  const cameraOptionStyle = {
    flex: 3,
  }

  return (


    <div>
      <div style={logoStyle}>
        <img src={logo} alt="logo" width="40%" height="auto"/>
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
          <CameraOption btnClick={btnClick} icon={cameraPic}/>
        </div>
      </div>



    </div>
  )
}
