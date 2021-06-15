import React from "react";
import Options from "./Options";
import CameraOption from "./CameraOption";
import { Link } from "react-router-dom";
import settingsPic from "../../assets/settings.png";
import aboutPic from "../../assets/about.png";
import logo from "../../assets/logo.png";
import cameraPic from "../../assets/webcam.png";

export default function SideBar({ btnClick }) { 
  const remote = require('electron').remote;
  
  const logoStyle = {
    height: "10vh",
    position: "relative",
    top: "-4vh"
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
    flexDirection: "column",
    marginTop: "3vh"
  }

  const optionStyle = {
    flex: 1,
  }

  const cameraOptionStyle = {
    flex: 1,
  };

  const closeScreen = () => {
    var window = remote.getCurrentWindow();
    window.close(); 
  }

  const minimizeScreen = () => {
    var window = remote.getCurrentWindow();
    window.minimize(); 
  }

  const menuButtonStyle = {
    color: "#111111",
    backgroundColor: "transparent",
    position: "relative",
    left: "17.5vw",
    top: "-7vh",
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    fontFamily: "Oxygen",
    fontWeight: "Bold"
  }

  return (
    <div>
      <div style={logoStyle}>
        <img src={logo} alt="logo" width="54.5%" height="auto" />
      </div>
      <div>
        <button style={menuButtonStyle} onClick={minimizeScreen}>—</button>
        <button style={menuButtonStyle} onClick={closeScreen}>X</button>
      </div>
      <div style={optionWrapper}>
        <div style={minorOptions}>
          <div style={optionStyle}>
            <Link to="/settings" >
              <Options btnClick={btnClick} name={"Settings"} imagePic={settingsPic} />
            </Link>
          </div>
          <div style={optionStyle}>
            <Link to="/about">
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
