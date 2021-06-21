import React, {Component} from 'react';
import SideBar from "./Sidebar";
import AddSetting from "./AddSettings"
import {Link} from "react-router-dom";
import { ipcRenderer } from "electron";
const {
  OPEN_FILE_EXPLORER,
  SEND_FILE_PATH,
} = require("../../../etc/constants")

const activeBtn = {
  backgroundColor: "#045bb7",
  color: "white",
}

const disabledBtn = {
  backgroundColor: "#51595b",
  color: "#bdb49d"
}

export default class CustomLayout extends Component{
  constructor() {
    super();

    this.state = {
      urlBtn: activeBtn,
      fileBtn: disabledBtn,
      filePath: "...",

    };
    this.focusUrl = this.focusUrl.bind(this);
    this.focusFile = this.focusFile.bind(this);
    this.addSetting = this.addSetting.bind(this);
    this.updateFilePath = this.updateFilePath.bind(this);

  }

  //update File Path received from electron
  componentDidMount() {
    ipcRenderer.on(SEND_FILE_PATH, this.updateFilePath);
  }
  componentWillUnmount() {
    ipcRenderer.removeListener(SEND_FILE_PATH, this.updateFilePath);
  }
  updateFilePath(event, data) {
    this.setState({filePath: data})
  }



  focusUrl() {
    this.setState({ urlBtn: activeBtn });
    this.setState({ fileBtn: disabledBtn });

  }
  focusFile() {
    this.setState({ urlBtn: disabledBtn });
    this.setState({ fileBtn: activeBtn });
    ipcRenderer.send(OPEN_FILE_EXPLORER);
  }

  addSetting() {
    console.log("add setting")
  }

  render() {


    const flexContainer = {
      display: "flex",
      margin: 0,
      padding: 0,
      backgroundColor: "#ececec",
    };



    const mainContentStyle = {
      margin: "0vh 1vh 1vh 0",
      padding: 0,
      flex: 3,
      height: "100vh",
    }

    const titleStyle = {
      textAlign: "center",
      color: "#111111",
      fontFamily: "Sacramento",
      fontSize: 25,
      margin: "8vh",
    };

    const pathTypeStyle = {
      paddingLeft: "23vw"
    }

    const btnStyle = {
      border: "none",
      outline: "none",
      cursor: "pointer",
      overflow: "hidden",
      borderRadius: "10px",
      height: "8vh",
      padding: "2vh 5vw",
      marginRight: "5vw"

    }

    const browserStyle = {
      margin: "25px 0 0 50px",
    }

    const addBtn = {
      color: "#ffd9d9",
      backgroundColor: "#a31212",
      margin: "10px 0 0 31vw"
    }


    return (
      <div style={flexContainer}>
        <div style={mainContentStyle}>
          <div style={titleStyle}>
            <h1>Customize</h1>
          </div>

          <div style={pathTypeStyle}>
            <button style={Object.assign({}, btnStyle, this.state.urlBtn)} onClick={this.focusUrl}>Url</button>
            <button style={Object.assign({}, btnStyle, this.state.fileBtn)} onClick={this.focusFile}>File</button>
          </div>

          {/*<AddSetting />*/}
          <div>{this.state.filePath}</div>

          <Link to="/settings">
            <button style={Object.assign({}, btnStyle, addBtn)} onClick={this.addSetting}>Add</button>
          </Link>

        </div>
        <SideBar />
      </div>
    )
  }
}
