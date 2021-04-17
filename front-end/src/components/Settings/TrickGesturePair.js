import React from "react"
import Tricks from "./Tricks";
import HandButtons from "./HandButtons";

export default function TrickGesturePair({trick}) {


  const tricksStyle = {
    flex: 1,
    backgroundColor: "green"
  }

  const handButtonsStyle = {
    flex: 1,
    backgroundColor: "red"
  }

  return (
    <div>
        <div style={tricksStyle}>
          <Tricks trick={trick}/>
        </div>
        <div style={handButtonsStyle}>
          <HandButtons />
        </div>
    </div>

    )


}
