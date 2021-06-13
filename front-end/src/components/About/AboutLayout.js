import React, { useState } from "react";
import SideBar from "./SideBar.js";
import configData from "../../data/config.json";

export default function SettingsLayout() {
  const [data, setData] = useState(configData.settings);

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

  const pairStyle = {
    margin: "0 7vw 0 0",
  };

  function changeSettings(index, newNum) {
    let copy = data;
    copy[index][1] = newNum;
    setData(copy);
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
        <div style={pairStyle}>
          
        </div>
      </div>
    </div>
  );
}
