import React from 'react'
import TrickGesturePair from "./TrickGesturePair";

export default function TrickGesturesPairs({tricks, defaultNum, data}) {


  return (
    <div>
      {
        tricks.map((trick, index) => (

          <TrickGesturePair trick={trick} initialBtnName={data[index][1]} dat={data[index]} key={data[index][2]}/>

        ))
      }
    </div>
  )



}
