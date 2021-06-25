import React, { Component } from "react";
import SideBar from "./SideBar.js";
import MenuBar from "../MenuBar/MenuBar";
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

  async changeSettings(originalConfiguration, newGesture) {
    const updatedConfiguration = { hand: "", gesture: newGesture, action: "", alias: originalConfiguration };
    await fetch("http://localhost:5000/config/update_configuration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedConfiguration),
    });

    console.log("Settings Layout - changeSettings:");
    console.log("updatedConfiguration:", updatedConfiguration);

    fetch("http://localhost:5000/config/retrieve").then((response) =>
      response.json().then((data) => {
        this.setState({ data: data.config });
        console.log("data:", data);
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
      padding: 0,
      flex: 3,
      height: "100vh",
      marginTop: "-2vh",
    };

    const titleStyle = {
      textAlign: "center",
      color: "#111111",
      fontFamily: "Lobster Two",
    };

    const pairStyle = {
      margin: "-3vh 5vw 0 7vw",
      height: "70vh",
      overflow: "auto",
    };

    return (
      <div>
        <MenuBar />
        <div id="settings-back" style={flexContainer}>
          <div style={settingsStyle}>
            <div style={titleStyle}>
              <h1 style={{ fontWeight: "400", fontSize: "3em" }}>Settings</h1>
            </div>
            <div style={pairStyle}>
              <TrickGesturesPairs changeSettings={this.changeSettings} data={this.state.data} />
            </div>
          </div>
          <div style={sideScreen}>
            <SideBar btnClick={this.click} />
          </div>
        </div>
      </div>
    );
  }
}
