import React from 'react'
import MenuButtons from "../MainScreen/MenuButtons";

export default function SideBar() {
  const sideBar = {
    flex: 1,
    backgroundColor: "#ffd6c2"
  }
  const spacer = {
    height: "10vh",
    position: "relative",
    top: "-4.5vh",
  };

  return (
    <div style={sideBar}>
      <div style={spacer}></div>
      <div>
        <MenuButtons/>
      </div>
    </div>
  )
}
