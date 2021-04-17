import React from 'react'
import TrickGesturePair from "./TrickGesturePair";

export default function TrickGesturesPairs({tricks}) {

  return (
    <div>
      {
        tricks.map((trick) => (
          <TrickGesturePair trick={trick} />
        ))
      }
    </div>
  )



}
