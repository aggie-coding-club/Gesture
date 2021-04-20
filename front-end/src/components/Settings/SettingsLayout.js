import React, {useState} from 'react'
import TrickGesturesPairs from "./TrickGesturePairs";
import configData from "../../data/config.json"

export default function SettingsLayout() {
  const tricks = ["open chrome", "mute volume", "raise volume", "lower volume"]
  const defaultNum = [1, 2, 3, 4, 5, 6, 7, 8, 9] //FIXME: should be read from file
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

  function newSetting(index, newNum) {
    // let index = 0;
    // let newNum = 100;

    let copy = data;
    copy[index][1] = newNum;

    setData(copy);
  }

  function displayData() {
    console.log(data[0][1]);
  }


  return (
    <div style={settingsStyle}>
      <div style={titleStyle}>
        <h1>SETTINGS</h1>
      </div>
      <div style={pairStyle}>
        <TrickGesturesPairs tricks={tricks} defaultNum={defaultNum} data={data}/>
      </div>
      <div>
        <button onClick={newSetting}>Change data</button>
        <button onClick={displayData}>See data</button>
      </div>
    </div>
  )
}
