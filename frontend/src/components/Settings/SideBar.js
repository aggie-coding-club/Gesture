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
      </div>
    </div>
  );
}
