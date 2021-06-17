import React, { Component } from "react";
import SideBar from "./SideBar.js";
import TrickGesturesPairs from "./TrickGesturePairs";
import configData from "../../data/config.json";
import { ipcRenderer } from "electron";
const { BUTTON_CLICK, SEND_TO_RENDERER } = require("../../../etc/constants.js");

export default class SettingsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: configData.settings,
    };
    this.changeSettings = this.changeSettings.bind(this);
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
    console.log("renderer msg:", data);
  }

  //.........Example of React sending message to Electron..............
  click(name) {
    console.log("click:", name);
    ipcRenderer.send(BUTTON_CLICK, name);
  }

  //...................................................................
  changeSettings(index, newNum) {
    let copy = this.state.data;
    copy[index][1] = newNum;
    this.setState({ data: copy });
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
          <SideBar btnClick={this.click} />
        </div>
      </div>
    );
  }
}
