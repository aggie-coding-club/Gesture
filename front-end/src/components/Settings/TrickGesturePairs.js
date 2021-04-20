import React from 'react'
import TrickGesturePair from "./TrickGesturePair";

export default function TrickGesturesPairs({tricks, defaultNum, data}) {


  return (
    <div>
      {
        tricks.map((trick, index) => (

          <TrickGesturePair trick={trick} initialBtnName={defaultNum} dat={data[index]} key={data[index][2]}/>

        ))
      }
    </div>
  )



}
