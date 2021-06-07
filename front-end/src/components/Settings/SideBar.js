import React from "react";
import Options from "../MainScreen/Options";
import { Link } from "react-router-dom";
import homePic from "../../assets/home.png";
import profilePic from "../../assets/profile.png";
import aboutPic from "../../assets/about.png";
import logo from "../../assets/logo.png";

export default function SideBar({ btnClick }) {
  const logoStyle = {
    height: "10vh",
    paddingLeft: "1vw",
  };

  const optionWrapper = {
    margin: "15vh 2.5vw",
  };

  const cameraOptionStyle = {
    margin: "15vh 3vw 0 0",
  };

  return (
    <div>
      <div style={logoStyle}>
        <img src={logo} alt="logo" width="40%" height="auto" />
      </div>
      <div style={optionWrapper}>
        <div>
          <Link to="">
            <Options btnClick={btnClick} name={"Home"} imagePic={homePic} />
          </Link>
          <Link to="">
            <Options btnClick={btnClick} name={"About"} imagePic={aboutPic} />
          </Link>
        </div>
      </div>
    </div>
  );
}
