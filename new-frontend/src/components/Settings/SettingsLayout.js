import React, { Component } from "react";
import SideBar from "./SideBar.js";
import TrickGesturesPairs from "./TrickGesturePairs";
import configData from "../../data/config.json";
import {ipcRenderer} from 'electron';
const {BUTTON_CLICK, SEND_TO_RENDERER} = require('../../../utils/constants.js')

export default class SettingsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: configData.settings,
    }
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
    console.log('renderer msg:', data);
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
    this.setState({data: copy})
  }

  render() {
    const flexContainer = {
      display: "flex",
      margin: 0,
      padding: 0,
      backgroundColor: "#090e18",
    };

    const sideScreen = {
      color: "#afb0b2",
      flex: 1,
      height: "100vh",
    };

    const settingsStyle = {
      height: "98vh",
      margin: "1vh 1vh 1vh 0",
      padding: 0,
      flex: 3,
    };

    const titleStyle = {
      textAlign: "center",
      color: "white",
      letterSpacing: "0.3em",
      fontFamily: "Oxygen",
      fontWeight: "bold",
      fontSize: 13,
      margin: "8vh 0 3vh",
    };

    const pairStyle = {
      margin: "0 7vw 0 7vw",
    };

    return (
      <div style={flexContainer}>
        <div style={sideScreen}>
          <SideBar btnClick={this.click}/>
        </div>
        <div style={settingsStyle}>
          <div style={titleStyle}>
            <h1>SETTINGS</h1>
          </div>
          <div style={pairStyle}>
            <TrickGesturesPairs changeSettings={this.changeSettings} data={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}

