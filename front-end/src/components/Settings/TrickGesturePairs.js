import React from 'react'
import TrickGesturePair from "./TrickGesturePair";

export default function TrickGesturesPairs({tricks, defaultNum}) {


  return (
    <div>
      {
        tricks.map((trick, index) => (

          <TrickGesturePair trick={trick} initialBtnName={defaultNum[index]}/>

        ))
      }
    </div>
  )



}
