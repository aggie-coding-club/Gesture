import React from "react";
import TrickGesturePair from "./TrickGesturePair";

export default function TrickGesturesPairs({ data, changeSettings }) {
  return (
    <div>
      {data.map((trick, index) => (
        <TrickGesturePair dat={data[index]} index={index} fullData={data} key={data[index][2]} changeSettings={changeSettings} />
      ))}
    </div>
  );
}
