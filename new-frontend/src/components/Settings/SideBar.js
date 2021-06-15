import React from "react";
import Options from "../MainScreen/Options";
import { Link } from "react-router-dom";
import homePic from "../../assets/home.png";
import logo from "../../assets/logo.png";

export default function SideBar({ btnClick }) {
  const logoStyle = {
    height: "10vh",
    position: "relative",
    top: "-4vh"
  };

  const optionWrapper = {
    margin: "17vh 3vw",
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
        <div>
          <Link to="">
            <Options btnClick={btnClick} name={"Home"} imagePic={homePic} />
          </Link>
        </div>
      </div>
    </div>
  );
}
