import React, { Component } from 'react'
import HandButtons from "./HandButtons";
import Select from 'react-select'

export default function TrickGesturePair({ dat, index, fullData, changeSettings }) {
  const contentStyle = {
    display: "flex",
    textAlign: "center",
    padding: "2vh 10vh",
    

    borderBottom: "1px solid gray",
  };

  const trickContainer = {
    flex: 1,
    margin: "0vh 0vh 0vh 8vh",
    webkitAppRegion: "no-drag"
  };

  const handButtonsStyle = {
    flex: 1,
    margin: "0vh 0vh 0vh 5vh"
  };

  const options = []
  for (let i = 0; i < fullData.length; i++) {
    options.push({ value: fullData[i][0], label: fullData[i][0] });
  }

  return (
    <div style={contentStyle}>
      <div style={trickContainer}>
        <Select value={options[index]} options={options} />
      </div>
      <div style={handButtonsStyle}>
        <HandButtons dat={dat} changeSettings={changeSettings} />
      </div>
    </div>
  );
}
