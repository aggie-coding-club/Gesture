import React from "react"
import HandButtons from "./HandButtons";

export default function TrickGesturePair({dat, changeSettings}) {
  let trick = dat[0]
  const contentStyle = {
    display: "flex",
    textAlign: "center",
    padding: "3vh 0",

    borderBottom: "1px solid #090e18"
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
  }

  return (
    <div style={contentStyle}>
        <div style={trickContainer}>
          <div style={tricksStyle}>
            <h4>{trick}</h4>
          </div>

        </div>
        <div style={handButtonsStyle}>
          <HandButtons dat={dat} changeSettings={changeSettings}/>
        </div>
    </div>

    )


}
