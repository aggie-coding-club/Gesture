import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import camOff from "../../assets/camera-off.png";

export default function MainLayout() {
  useEffect(() => {
    fetch("http://localhost:5000/config/retrieve").then((response) =>
      response.json().then((data) => {
        console.log(data);
      })
    );
  }, []);

  const btnClick = (name) => {
    console.log("clicked", name);
  };

  const flexContainer = {
    display: "flex",
    margin: 0,
    padding: 0,
    backgroundColor: "grey",
  };

  const sideScreen = {
    backgroundColor: "#ececec",
    flex: 1,
    height: "100vh",
  };

  const cameraScreen = {
    flex: 3,
    height: "100vh",
    color: "#afb0b2",
    overflow: "hidden",
  };

  return (
    <div style={flexContainer}>
      <div style={cameraScreen}>
        <img src={camOff}></img>
      </div>
      <div style={sideScreen}>
        <SideBar btnClick={btnClick} />
      </div>
    </div>
  );
}
