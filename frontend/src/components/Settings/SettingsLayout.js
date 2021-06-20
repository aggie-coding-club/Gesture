import React, { Component } from "react";
import SideBar from "./SideBar.js";
import TrickGesturesPairs from "./TrickGesturePairs";
import { ipcRenderer } from "electron";
const { BUTTON_CLICK, SEND_TO_RENDERER, OPEN_CUSTOM_WINDOW } = require("../../../etc/constants.js");

export default class SettingsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.changeSettings = this.changeSettings.bind(this);
    this.click = this.click.bind(this);
    //this.openCustomWindow = this.openCustomWindow.bind(this);
    this.handleRenderer = this.handleRenderer.bind(this);
  }

  //............Example of Electron sending message to React..............
  componentDidMount() {
    ipcRenderer.on(SEND_TO_RENDERER, this.handleRenderer);
    fetch("http://localhost:5000/config/retrieve").then((response) =>
      response.json().then((data) => {
        this.setState({ data: data.config });
      })
    );
  }
  componentWillUnmount() {
    ipcRenderer.removeListener(SEND_TO_RENDERER, this.handleRenderer);
  }
  handleRenderer(event, data) {
    console.log("renderer msg:", data);
  }

  //.........Example of React sending message to Electron..............
  click(name) {
    console.log("click:", name);
    ipcRenderer.send(BUTTON_CLICK, name);
  }
  //...................................................................

  // openCustomWindow() {
  //   console.log('React -- open custom window')
  //   ipcRenderer.send(OPEN_CUSTOM_WINDOW)
  // }

  async changeSettings(originalConfiguration, newGesture) {
    const updatedConfiguration = { hand: "", gesture: newGesture, action: "", alias: originalConfiguration };
    await fetch("http://localhost:5000/config/update_configuration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedConfiguration),
    });

    fetch("http://localhost:5000/config/retrieve").then((response) =>
      response.json().then((data) => {
        this.setState({ data: data.config });
      })
    );
  }

  render() {
    const flexContainer = {
      display: "flex",
      margin: 0,
      padding: 0,
      backgroundColor: "#ececec",
    };

    const sideScreen = {
      flex: 1,
    };

    const settingsStyle = {
      margin: "0vh 1vh 1vh 0",
      padding: 0,
      flex: 3,
      height: "100vh",
    };

    const titleStyle = {
      textAlign: "center",
      color: "#111111",
      fontFamily: "Sacramento",
      fontSize: 25,
      margin: "8vh",
    };

    const pairStyle = {
      margin: "-8vh 7vw 0 7vw",
    };

    return (
      <div id="settings-back" style={flexContainer}>
        <div style={settingsStyle}>
          <div style={titleStyle}>
            <h1>Settings</h1>
          </div>
          <div style={pairStyle}>
            <TrickGesturesPairs changeSettings={this.changeSettings} data={this.state.data} />
          </div>
        </div>
        <div style={sideScreen}>
          <SideBar btnClick={this.click}/>
        </div>
      </div>
    );
  }
}
