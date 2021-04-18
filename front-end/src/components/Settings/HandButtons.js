import React, {useState} from 'react'
import Modal from 'react-modal'
import GestureBox from "./GestureBox";


export default function HandButtons() {

  const [borderClr, setBorderClr] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [buttonName, setButtonName] = useState(-1); //FIXME: should read in from file

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
    setButtonName(newGesture);
  }

  const btnStyle = {
    cursor: "pointer",
    border: borderClr,
    color: "#afb0b2",
    backgroundColor: "#162440",
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

  const gestures = {
    padding: "5vh"

  }

  return (
    <div>
      <button style={btnStyle} onClick={handleClick}> {buttonName} </button>
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
              <GestureBox name={1} newSetting={newSetting}/>
              <GestureBox name={2} newSetting={newSetting}/>
              <GestureBox name={3} newSetting={newSetting}/>
            </div>
            <div style={row}>
              <GestureBox name={4} newSetting={newSetting}/>
              <GestureBox name={5} newSetting={newSetting}/>
              <GestureBox name={6} newSetting={newSetting}/>
            </div>
            <div style={row}>
              <GestureBox name={7} newSetting={newSetting}/>
              <GestureBox name={8} newSetting={newSetting}/>
              <GestureBox name={9} newSetting={newSetting}/>
            </div>
          </div>

        </Modal>
    </div>
  )
}
