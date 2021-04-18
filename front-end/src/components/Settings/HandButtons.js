import React, {useState} from 'react'
import Modal from 'react-modal'


export default function HandButtons() {

  const [borderClr, setBorderClr] = useState("none");
  const [showModal, setShowModal] = useState(false)

  function handleClick() {
    //if button clicked, outline border
    setBorderClr("1px solid white");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false)
    setBorderClr("none")
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
      <button style={btnStyle} onClick={handleClick}> Button </button>
        <Modal
          isOpen={showModal}
          contentLabel="Minimal example"
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={{
            overlay: {
              //backgroundColor: 'papayawhip'
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
              <div style={innerGrid}>
                <div style={gestures}>1</div>
              </div>
              <div style={innerGrid}>
                <div style={gestures}>2</div>
              </div>
              <div style={innerGrid}>
                <div style={gestures}>3</div>
              </div>
            </div>
            <div style={row}>
              <div style={innerGrid}>
                <div style={gestures}>4</div>
              </div>
              <div style={innerGrid}>
                <div style={gestures}>5</div>
              </div>
              <div style={innerGrid}>
                <div style={gestures}>6</div>
              </div>
            </div>
            <div style={row}>
              <div style={innerGrid}>
                <div style={gestures}>7</div>
              </div>
              <div style={innerGrid}>
                <div style={gestures}>8</div>
              </div>
              <div style={innerGrid}>
                <div style={gestures}>9</div>
              </div>
            </div>
          </div>

        </Modal>
    </div>
  )
}
