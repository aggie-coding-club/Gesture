import React from "react";

export default function SideBar() {
  const sideBar = {
    flex: 1,
    backgroundColor: "#CBE3FF",
  };

  const spacer = {
    height: "10vh",
    position: "relative",
  };

  return (
    <div style={sideBar}>
      <div style={spacer}></div>
    </div>
  );
}
