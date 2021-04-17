import React from "react"
import Trick from "./Tricks";
import HandButtons from "./HandButtons";

export default function TrickGesturePair({trick}) {
  const contentStyle = {
    display: "flex",
    textAlign: "center",
    padding: "3vh 0",

    borderBottom: "1px solid #afb0b2"
  }


  const tricksStyle = {
    flex: 1,
    //backgroundColor: "green"
  }

  const handButtonsStyle = {
    flex: 1,
    //backgroundColor: "red"
  }

  return (
    <div style={contentStyle}>
        <div style={tricksStyle}>
          <Trick trick={trick}/>
        </div>
        <div style={handButtonsStyle}>
          <HandButtons />
        </div>
    </div>

    )


}
