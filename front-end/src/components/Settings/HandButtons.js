import React, {useState} from 'react'
import Modal from 'react-modal'
import GestureBox from "./GestureBox";
import fist from "../../assets/gestures/fist.png";
import onefinger from "../../assets/gestures/one-finger.png";
import peace from "../../assets/gestures/peace.png";
import threefingers from "../../assets/gestures/three-fingers.png";
import fourfingers from "../../assets/gestures/four-fingers.png";
import openhand from "../../assets/gestures/open-hand.png";
import rocknroll from "../../assets/gestures/rock-and-roll.png";

export default function HandButtons({dat, changeSettings}) {

  const [borderClr, setBorderClr] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [redNum, setRedNum] = useState(-2);


  function handleClick() {
    //if button clicked, outline border
    setBorderClr("1px solid white");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false)
    setBorderClr("none")
  }

  function newSetting(newGesture) {
    changeSettings(dat[2] - 1, newGesture)
    setRedNum(newGesture)
    console.log(newGesture);
    //setTimeout(function(){ setShowModal(false) }, 500);
  }

  const btnStyle = {
    cursor: "pointer",
    border: borderClr,
    backgroundColor: "#3800ff",
    padding: "2vh 3vw",
    outline: "none",
    borderRadius: "10px"
  }

  const modalContainer = {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    margin: 0,
    height: "100%"
  }

  const row = {
    flex: 1,
    border: "1px solid white",
    display: "flex",
    flexDirection: "row"
  }

  const innerGrid = {
    flex: 1,
    textAlign: "center",
    borderRight: "1px solid white",
    color: "white",
  }


  const imgFormat = {
    width: "auto",
    height: "3vh"
  }

  return (
    <div>
      <button style={btnStyle} onClick={handleClick}> <img style={imgFormat} src={dat[1]}></img> </button>
        <Modal
          isOpen={showModal}
          contentLabel="Minimal example"
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={{
            overlay: {
              margin: 0,
              padding: 0
            },
            content: {
              backgroundColor: "#081a2d",
              height: "42vh",
              width: "42vh",
              margin: "30vh auto",
              padding: 0
            }
          }}
        >
          <div style={modalContainer}>
            <div style={row}>
              <GestureBox name={onefinger} newSetting={newSetting} redNum={redNum}/>
              <GestureBox name={peace} newSetting={newSetting} redNum={redNum}/>
              <GestureBox name={threefingers} newSetting={newSetting} redNum={redNum}/>
            </div>
            <div style={row}>
              <GestureBox name={fourfingers} newSetting={newSetting} redNum={redNum}/>
              <GestureBox name={openhand} newSetting={newSetting} redNum={redNum}/>
              <GestureBox name={fist} newSetting={newSetting} redNum={redNum}/>
            </div>
            <div style={row}>
              <GestureBox name={rocknroll} newSetting={newSetting} redNum={redNum}/>
              <GestureBox name={0} newSetting={newSetting} redNum={redNum}/>
              <GestureBox name={0} newSetting={newSetting} redNum={redNum}/>
            </div>
          </div>

        </Modal>
    </div>
  )
}
