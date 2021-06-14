import React from "react";
import SideBar from "./SideBar.js";
import aboutImage from "../../assets/aboutimage.png"

export default function AboutLayout() {
  const btnClick = (name) => {
    console.log("clicked", name);
  };

  const flexContainer = {
    display: "flex",
    margin: 0,
    padding: 0,
    backgroundColor: "#090e18",
  };

  const sideScreen = {
    //background: "#090e18",
    color: "#afb0b2",
    flex: 1,
    height: "100vh",
  };

  const settingsStyle = {
    height: "98vh",
    margin: "1vh 1vh 1vh 0",
    padding: 0,
    flex: 3,
  };

  const titleStyle = {
    textAlign: "center",
    color: "white",
    letterSpacing: "0.3em",
    fontFamily: "Oxygen",
    fontWeight: "bold",
    fontSize: 13,
    margin: "8vh 0 3vh",
  };


  const textStyle = {
    textAlign: "center",
    letterSpacing: "0.1em",
    color: "white",
    fontFamily: "Oxygen",
    fontWeight: "normal",
    fontSize: 15,
    margin: "5vh 5vh 0vh 2vh",
  };

  const imageStyle = {
    width: "80vh",
    display: "block",
    margin: "14vh 0vh 0vh 22vh",
  }

  return (
    <div style={flexContainer}>
      <div style={sideScreen}>
        <SideBar btnClick={btnClick} />
      </div>
      <div style={settingsStyle}>
        <div style={titleStyle}>
          <h1>ABOUT</h1>
        </div>
        <div style={textStyle}>
          Vision Controls is a desktop application that allows the user to control various applications through hand gestures. This purpose of this project is to provide students with a way to work in a team setting and achieve something while doing it. This project is managed by the Aggie Coding Club.
        </div>
        <img src={aboutImage} style={imageStyle}></img>
      </div>
    </div>
  );
}