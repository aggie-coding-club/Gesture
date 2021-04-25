import React, {useState} from 'react'
import TrickGesturesPairs from "./TrickGesturePairs";
import configData from "../../data/config.json"

export default function SettingsLayout() {
  const [data, setData] = useState(configData.settings);


  const settingsStyle = {
    backgroundColor: "#090e18",
    color: "#afb0b2",
    height: "100vh",
    padding: 0,
    margin: 0,
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

  function displayData() {
    console.log(data);
  }

  return (
    <div style={settingsStyle}>
      <div style={titleStyle}>
        <h1>SETTINGS</h1>
      </div>
      <div style={pairStyle}>
        <TrickGesturesPairs changeSettings={changeSettings} data={data}/>
      </div>
    </div>
  )
}
