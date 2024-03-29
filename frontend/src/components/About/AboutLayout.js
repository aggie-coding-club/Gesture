import React from "react";
import SideBar from "./SideBar.js";
import MenuBar from "../MenuBar/MenuBar";
import aboutImage from "../../assets/aboutlogo.png";

export default function AboutLayout() {
  const btnClick = (name) => {
    console.log("clicked", name);
  };

  const flexContainer = {
    display: "flex",
    margin: 0,
    padding: 0,
    backgroundColor: "#ececec",
  };

  const sideScreen = {
    flex: 1,
  };

  const aboutStyle = {
    margin: "0vh 1vh 1vh 0",
    padding: 0,
    flex: 3,
    height: "100vh",
  };

  const titleStyle = {
    textAlign: "center",
    color: "#111111",
    fontFamily: "Lobster Two",
  };

  const textStyle = {
    textAlign: "center",
    letterSpacing: "0.1em",
    color: "#111111",
    fontFamily: "Oxygen",
    fontWeight: "normal",
    fontSize: 15,
    margin: "-3vh 4vw 0 3vw",
  };

  const imageStyle = {
    width: "110vh",
    display: "block",
    marginTop: "6vh",
    marginLeft: "5vw",
  };

  return (
    <div>
      <MenuBar />
      <div style={flexContainer}>
        <div style={aboutStyle}>
          <div style={titleStyle}>
            <h1 style={{ fontWeight: "400", fontSize: "3em" }}>About</h1>
          </div>
          <div style={textStyle}>
            Vision Controls is a desktop application that allows the user to control various applications through hand gestures. This purpose of this
            project is to provide students with a way to work in a team setting and achieve something while doing it. This project is managed by the
            Aggie Coding Club.
          </div>
          <img src={aboutImage} style={imageStyle}></img>
        </div>
        <div style={sideScreen}>
          <SideBar btnClick={btnClick} />
        </div>
      </div>
    </div>
  );
}
