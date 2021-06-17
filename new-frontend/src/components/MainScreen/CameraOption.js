import React, { Component } from "react";
import {ipcRenderer} from 'electron';
import icon from "../../assets/webcam.png";
const {BUTTON_CLICK, SEND_TO_RENDERER} = require('../../../utils/constants.js')

export default class CameraOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camSource: 'http://localhost:5000/off'
    }
    this.handleRenderer = this.handleRenderer.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
  }

  //............Example of Electron sending message to React..............
  componentDidMount() {
    ipcRenderer.on(SEND_TO_RENDERER, this.handleRenderer);
  }
  componentWillUnmount() {
    ipcRenderer.removeListener(SEND_TO_RENDERER, this.handleRenderer);
  }
  handleRenderer(event, data) {
    console.log('renderer msg:', data);
  }



  toggleChange() {
    if (this.state.camSource == 'http://localhost:5000/video_feed') {
      this.setState({camSource: 'http://localhost:5000/off'});
      document.getElementById("blank").style.display="none";
    } else {
      this.setState({camSource: 'http://localhost:5000/video_feed'});
      document.getElementById("blank").style.display="block";
    }
  }

  render() {
    const btnContainer = {
      // padding: "50vh 0vh 0vh 0vh"
      margin: "50vh 0vh 0vh 3vh"
    }

    const btnStyle = {
      background: "#1250a4",
      color: "white",
      border: "none",
      outline: "none",
      cursor: "pointer",
      overflow: "hidden",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "row",
      height: "8vh",
    }

    const imageStyle = {
      backgroundColor: "#144586",
      padding: "1vh 1vw",
      marginLeft: "-1vh"
    }

    const wordStyle = {
      padding: "0.6vh 3vw",
      fontFamily: "Oxygen",
      fontWeight: "400"
    }

    const word = {
      marginTop: "1vh"
    }

    const videoStyle = {
      height: "480px",
      width: "640px",
      border: "none",
      position: "absolute",
      top: "0px",
      right: "25vw",
      display: "none"
    };

    return (
      <div>
        <div style={btnContainer}>
          <button style={btnStyle} onClick={this.toggleChange}>
            <div style={imageStyle}>
              <img src={icon} alt="camera" height="auto" width="25px"/>
            </div>
            <div style={wordStyle}>
              <p style={word}>Camera</p>
            </div>
          </button>
        </div>
        <div>
          <iframe
            id = "blank"
            style={videoStyle} 
            src={this.state.camSource} 
            scrolling={"no"}>
          </iframe>
        </div>
      </div>
    )
  }
};
