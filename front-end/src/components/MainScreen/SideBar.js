import React from "react";
import Options from "./Options";
import CameraOption from "./CameraOption";
import { Link } from "react-router-dom";
import settingsPic from "../../assets/settings.png";
import profilePic from "../../assets/profile.png";
import aboutPic from "../../assets/about.png";
import logo from "../../assets/logo.png";
import cameraPic from "../../assets/webcam.png";

export default function SideBar({ btnClick }) {
  const logoStyle = {
    height: "10vh",
    paddingLeft: "1vw",
  };

  const optionWrapper = {
    margin: "15vh 2.5vw",
    height: "60vh",
    display: "flex",
    flexDirection: "column"

  };

  const minorOptions  = {
    flex: 2,
    display: "flex",
    flexDirection: "column"
  }

  const optionStyle = {
    flex: 1,
  }

  const cameraOptionStyle = {
    flex: 1,
    marginRight: "3vw"
  };

  return (
    <div>
      <div style={logoStyle}>
        <img src={logo} alt="logo" width="40%" height="auto" />
      </div>
      <div style={optionWrapper}>
        <div style={minorOptions}>
          <div style={optionStyle}>
            <Link to="/settings" >
              <Options btnClick={btnClick} name={"Settings"} imagePic={settingsPic} />
            </Link>
          </div>
          <div style={optionStyle}>
            <Link to="">
              <Options btnClick={btnClick} name={"About"} imagePic={aboutPic} />
            </Link>
          </div>
        </div>
        <div style={cameraOptionStyle}>
          <CameraOption btnClick={btnClick} icon={cameraPic} />
        </div>
      </div>
    </div>
  );
}
