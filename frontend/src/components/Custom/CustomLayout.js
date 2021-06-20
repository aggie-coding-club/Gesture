import React from 'react';
import MenuButtons from "../MainScreen/MenuButtons";

export default function CustomLayout() {
  const flexContainer = {
    display: "flex",
    margin: 0,
    padding: 0,
    backgroundColor: "#ececec",
  };

  const sideBar = {
    flex: 1,
  }
  const spacer = {
    height: "10vh",
    position: "relative",
    top: "-4.5vh",
  };
  const mainContentStyle = {

    margin: "0vh 1vh 1vh 0",
    padding: 0,
    flex: 3,
    height: "100vh",

  }

  return (
    <div style={flexContainer}>
      <div style={mainContentStyle}>
        <h2>On the right track</h2>
      </div>
      <div style={sideBar}>
        <div style={spacer}></div>
        <div>
          <MenuButtons />
        </div>

      </div>

    </div>
  )
}
