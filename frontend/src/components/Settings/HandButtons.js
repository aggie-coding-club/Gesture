import React, { Component } from "react";
import Modal from "react-modal";
import GestureBox from "./GestureBox";
import fist from "../../assets/gestures/fist.png";
import onefinger from "../../assets/gestures/onefinger.png";
import twofinger from "../../assets/gestures/twofinger.png";
import threefingers from "../../assets/gestures/threefinger.png";
import fourfingers from "../../assets/gestures/fourfinger.png";
import openhand from "../../assets/gestures/openhand.png";
import rockandroll from "../../assets/gestures/rockandroll.png";
import thumbsup from "../../assets/gestures/thumbsup.png";
import thumbsdown from "../../assets/gestures/thumbsdown.png";

export default class HandButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderClr: "none",
      showModal: false,
      selected: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.newSetting = this.newSetting.bind(this);
  }

  handleClick() {
    this.setState({ borderClr: "1px solid white" });
    this.setState({ showModal: true });
    console.log("opening modal", this.state.showModal);
    document.getElementById("settings-back").style.webkitAppRegion = "no-drag";
  }

  closeModal() {
    this.setState({ borderClr: "none" });
    this.setState({ showModal: false });
    document.getElementById("settings-back").style.webkitAppRegion = "drag";
  }

  newSetting(newGesture) {
    this.props.changeSettings(this.props.dat["alias"], newGesture);
    this.setState({ selected: newGesture });
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
      WebkitAppRegion: "no-drag",
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
          <img style={imgFormat} src={require("../../assets/gestures/" + this.props.dat["gesture"] + ".png")}></img>{" "}
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
            },
            WebkitAppRegion: "no-drag",
          }}
        >
          <div style={modalContainer}>
            <div style={row}>
              <GestureBox name={onefinger} newSetting={this.newSetting} selected={this.state.selected} />
              <GestureBox name={twofinger} newSetting={this.newSetting} selected={this.state.selected} />
              <GestureBox name={threefingers} newSetting={this.newSetting} selected={this.state.selected} />
            </div>
            <div style={row}>
              <GestureBox name={fourfingers} newSetting={this.newSetting} selected={this.state.selected} />
              <GestureBox name={openhand} newSetting={this.newSetting} selected={this.state.selected} />
              <GestureBox name={thumbsup} newSetting={this.newSetting} selected={this.state.selected} />
            </div>
            <div style={row}>
              <GestureBox name={fist} newSetting={this.newSetting} selected={this.state.selected} />
              <GestureBox name={rockandroll} newSetting={this.newSetting} selected={this.state.selected} />
              <GestureBox name={thumbsdown} newSetting={this.newSetting} selected={this.state.selected} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
