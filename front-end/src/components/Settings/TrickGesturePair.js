import React from "react"
import HandButtons from "./HandButtons";

export default function TrickGesturePair({dat, changeSettings}) {
  let trick = dat[0]
  const contentStyle = {
    display: "flex",
    textAlign: "center",
    padding: "3vh 0",

    borderBottom: "1px solid #afb0b2"
  }

  const trickContainer = {
    flex: 1,
  }

  const tricksStyle = {
    margin: "auto",
    padding: "2vh 3vw",

  }

  const handButtonsStyle = {
    flex: 1,
    //backgroundColor: "red"
  }

  return (
    <div style={contentStyle}>
        <div style={trickContainer}>
          <div style={tricksStyle}>
            {trick}
          </div>

        </div>
        <div style={handButtonsStyle}>
          <HandButtons dat={dat} changeSettings={changeSettings}/>
        </div>
    </div>

    )


}
