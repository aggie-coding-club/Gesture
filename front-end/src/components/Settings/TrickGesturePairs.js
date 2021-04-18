import React from 'react'
import TrickGesturePair from "./TrickGesturePair";

export default function TrickGesturesPairs({tricks}) {


  return (
    <div>
      {
        tricks.map((trick, index) => (

          <TrickGesturePair trick={trick} initialBtnName={index+1}/>

        ))
      }
    </div>
  )



}
