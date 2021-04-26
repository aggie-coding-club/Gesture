import React, {useState} from 'react'
import backgroundPic from "../../assets/background.png"
import SideBar from "./SideBar.js"
import TrickGesturesPairs from "./TrickGesturePairs"
import configData from "../../data/config.json"

export default function SettingsLayout() {

  const [data, setData] = useState(configData.settings);

  const btnClick = (name) => {
    console.log("clicked", name)
  }

  const flexContainer = {
    display: "flex",
    backgroundImage: `url(${backgroundPic})`,
    margin: 0,
    padding: 0,
    backgroundColor: "#090e18",

  }

  const sideScreen = {
    //background: "#090e18",
    color: "#afb0b2",
    flex: 1,
    height: "100vh"
  }
  
  const settingsStyle = {
    backgroundColor: "#090e18",
  }

  const sideScreen = {
    //background: "#090e18",
    color: "#afb0b2",
    flex: 1,
    height: "100vh"
  }

  const settingsStyle = {
    background: "#3a414d",
    color: "#090e18",
    height: "98vh",
    borderRadius: "25px",
    margin: "1vh 1vh 1vh 0",
    padding: 0,
    flex: 3
  }

  const titleStyle = {
    textAlign: "center",
  }

  const pairStyle = {
    margin: "0 5vw 0 5vw"
  }

  function changeSettings(index, newNum) {
    let copy = data;
    copy[index][1] = newNum;
    setData(copy);
  }

  return (
    <div style={flexContainer}>

      <div style={sideScreen}>
        <SideBar btnClick={btnClick}/>
      </div>

      <div style={settingsStyle}>
        <div style={titleStyle}>
          <h1>SETTINGS</h1>
        </div>
        <div style={pairStyle}>
          <TrickGesturesPairs changeSettings={changeSettings} data={data}/>
        </div>
      </div>

    </div>
  )
}
