import React, {Component} from "react";
import Modal from "react-modal";
import GestureBox from "./GestureBox";
import fist from "../../assets/gestures/fist.png";
import onefinger from "../../assets/gestures/one-finger.png";
import peace from "../../assets/gestures/peace.png";
import threefingers from "../../assets/gestures/three-fingers.png";
import fourfingers from "../../assets/gestures/four-fingers.png";
import openhand from "../../assets/gestures/open-hand.png";
import rocknroll from "../../assets/gestures/rock-and-roll.png";

export default class HandButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderClr: "none",
      showModal: false,
      redNum: -2,
    }
    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.newSetting = this.newSetting.bind(this);
  }

  handleClick() {
    // outline border on button click
    this.setState({borderClr: "1px solid white"});
    this.setState({showModal: true})
    console.log("opening modal", this.state.showModal)
  }

  closeModal() {
    this.setState({borderClr: "none"});
    this.setState({showModal: false})
  }

  newSetting(newGesture) {
    this.props.changeSettings(this.props.dat[2] - 1, newGesture)
    this.setState({redNum: newGesture})
  }

  render() {
    const btnStyle = {
      cursor: "pointer",
      border: this.state.borderClr,
      backgroundColor: "#081a2d",
      padding: "2vh 3vw",
      outline: "none",
      borderRadius: "10px",
    };

    const modalContainer = {
      display: "flex",
      flexDirection: "column",
      padding: 0,
      margin: 0,
      height: "100%",
      webkitAppRegion: "no-drag"
    };

    const row = {
      flex: 1,
      border: "1px solid white",
      display: "flex",
      flexDirection: "row",
    };

    const imgFormat = {
      width: "auto",
      height: "3vh",
    };

    const blankBox = {
      flex: 1,
      textAlign: "center",
      borderRight: "1px solid white",
      color: "white",
    };

    return (
      <div>
        <button style={btnStyle} onClick={this.handleClick}>
          {" "}
          <img style={imgFormat} src={this.props.dat[1]}></img>{" "}
        </button>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal example"
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          style={{
            overlay: {
              margin: 0,
              padding: 0,
            },
            content: {
              backgroundColor: "#081a2d",
              height: "42vh",
              width: "42vh",
              margin: "auto auto",
              padding: 0,
              webkitAppRegion: "no-drag"
            },
          }}
        >
          <div style={modalContainer}>
            <div style={row}>
              <GestureBox name={onefinger} newSetting={this.newSetting} redNum={this.state.redNum} />
              <GestureBox name={peace} newSetting={this.newSetting} redNum={this.state.redNum} />
              <GestureBox name={threefingers} newSetting={this.newSetting} redNum={this.state.redNum} />
            </div>
            <div style={row}>
              <GestureBox name={fourfingers} newSetting={this.newSetting} redNum={this.state.redNum} />
              <GestureBox name={openhand} newSetting={this.newSetting} redNum={this.state.redNum} />
              <GestureBox name={fist} newSetting={this.newSetting} redNum={this.state.redNum} />
            </div>
            <div style={row}>
              <div style={blankBox}> </div>
              <GestureBox name={rocknroll} newSetting={this.newSetting} redNum={this.state.redNum} />
              <div style={blankBox}> </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }

}
