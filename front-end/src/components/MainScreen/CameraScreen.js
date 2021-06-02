
import React, { useEffect, useRef } from 'react'


export default function CameraScreen() {


  
  /*

  ***Something to look into, this is how you add webcam feed to the screen using js, but as to how to get it from the openCV python file it seems a lot more complicated***


  const videoRef = useRef(null) //initial camera refrence to null 

  const getVideo = ()=> {
    navigator.mediaDevices
    .getUserMedia({ video: true })   //set as true to try and fix packaging error
    .then(stream => {
      let video = videoRef.current
      video.srcObject = stream
      video.play()
    })
    .catch(e=>{
      console.log(e)
    })
  }

  //sets video reference
  useEffect(()=>{
    getVideo()
  },[videoRef])
  */

  const camera = {
    height: '100%',
    width: '100%'
  }


  return (
    <>
      <div>
        <video style={camera} ref={null}></video>
      </div>
    </>
  )
}
