import React, { Component } from "react";
import {ipcRenderer} from 'electron';
import icon from "../../assets/webcam.png";
const {BUTTON_CLICK, SEND_TO_RENDERER} = require('../../../utils/constants.js')

export default class CameraOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    this.click = this.click.bind(this);
    this.handleRenderer = this.handleRenderer.bind(this);
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

  //.........Example of React sending message to Electron..............
  click(name) {
    console.log("click:", name);
    ipcRenderer.send(BUTTON_CLICK, name);
  }


  toggleChange() {
    // if (visible == 'http://localhost:5000/video_feed')
    //   setVisible('http://localhost:5000/off')
    // else
    //   setVisible('http://localhost:5000/video_feed')
  }

  render() {
    const btnContainer = {
      padding: "20vh 0 0vh 2vh"
    }

    const btnStyle = {
      background: "#1250a4",
      color: "white",
      border: "none",
      cursor: "pointer",
      overflow: "hidden",
      outline: "none",
      margin: "auto",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "row",
      height: "8vh",
    }

    const imageStyle = {
      backgroundColor: "#144586",
      padding: "1vh 1vw"
    }

    const wordStyle = {
      padding: "1vh 3vw"
    }

    const word = {
      marginTop: "1vh"
    }

    const videoStyle = {
      height: "480px",
      width: "640px",
      border: "none",
      position: "absolute",
      top: "6px",
      right: "5px",
      height: "98vh",
      borderRadius: "25px",
    };

    return (
      <div>
        <div style={btnContainer}>
          <button style={btnStyle} onClick={this.click}>
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
            style={videoStyle} 
            src={"http://localhost:5000/video_feed"} 
            scrolling={"no"}>
          </iframe>
        </div>
      </div>
    )
  }
};
