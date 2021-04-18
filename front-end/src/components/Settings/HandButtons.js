import React, {useState} from 'react'
import Modal from 'react-modal'


export default function HandButtons() {

  const [borderClr, setBorderClr] = useState("none");
  const [showModal, setShowModal] = useState(false)

  function handleClick() {
    if(borderClr == "none") {
      setBorderClr("1px solid white");
    } else {
      //FIXME: once pick gesture, or click away, none
      setBorderClr("none");
    }

    setShowModal(true);
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
  function closeModal() {
    setShowModal(false)
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
          },
          content: {
            backgroundColor: "red",
            height: "20vh",
            width: "10vw",
            margin: "10vw"
          }
        }}
      >

        <button onClick={closeModal}>Exit</button>
      </Modal>
    </div>
  )
}
