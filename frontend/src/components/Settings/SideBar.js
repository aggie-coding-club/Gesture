import React from "react";
import Options from "../MainScreen/Options";
import MenuButtons from "../MainScreen/MenuButtons";
import { Link } from "react-router-dom";
import homePic from "../../assets/home.png";

export default function SideBar({ btnClick }) {
  const spacer = {
    height: "10vh",
    position: "relative",
    top: "-4.5vh",
  };

  const optionWrapper = {
    margin: "12vh 3vw",
  };

  const customBtn = {
    background: "#1250a4",
    color: "white",
    border: "none",
    outline: "none",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
    height: "8vh",
    padding: "0 10px",
    marginTop: "50px"
  }



  return (
    <div>
      <div style={spacer}></div>
      <div>
        <MenuButtons />
      </div>
      <div style={optionWrapper}>
        <div>
          <Link to="">
            <Options btnClick={btnClick} name={"Home"} imagePic={homePic} />
          </Link>
        </div>
        <div>
          <Link to="/custom">
            <button style={customBtn}>New Custom Setting</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
