import React, {Component} from 'react';
import SideBar from "./Sidebar";
import AddSetting from "./AddSettings"
import {Link} from "react-router-dom";
import { ipcRenderer } from "electron";
const {
  OPEN_FILE_EXPLORER,
  SEND_FILE_PATH,
  ADD_FILE_SETTING,
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
      filePath: "Choose File",
      filePathVisible: "none",
      filePathColor: "#51595b"

    };
    this.focusUrl = this.focusUrl.bind(this);
    this.focusFile = this.focusFile.bind(this);
    this.addFileSetting = this.addFileSetting.bind(this);
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
    this.setState({filePathColor: "black"})
  }

  focusUrl() {
    this.setState({ urlBtn: activeBtn });
    this.setState({ fileBtn: disabledBtn });
    this.setState({filePathVisible: "none"})

  }
  focusFile() {
    this.setState({ urlBtn: disabledBtn });
    this.setState({ fileBtn: activeBtn });
    this.setState({filePathVisible: "flex"})

    ipcRenderer.send(OPEN_FILE_EXPLORER);
  }

  addFileSetting() {
    this.setState({filePathVisible: "none"})
    if(this.state.filePath !== "Choose File" && this.state.filePathVisible === "flex") {
      console.log("add file setting: ", this.state.filePath)
      //Send file path to electron
      ipcRenderer.send(ADD_FILE_SETTING, this.state.filePath)
    }
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
      marginRight: "5vw",
      width: "100px",
      textAlign: "center"

    }

    const browserStyle = {
      margin: "25px 0 0 50px",
    }

    const addCancelStyle = {
      //margin: "10px 35vw",
      marginLeft: "32.5vw"
    }

    const addBtn = {
      color: "#ffd9d9",
      backgroundColor: "#a31212",
      marginTop: "5vh"

    }

    const cancelBtn = {
      backgroundColor: "#8f9cb0",
      color: "#1d2430",
    }

    const filePathContainer = {
      display: this.state.filePathVisible,
      margin: "10vh 10vw",

    }

    const fileTextStyle = {
      border: "1px black solid",
      borderRadius: "10px",
      textAlign: "center",
      color: this.state.filePathColor,
      flex: "5",
      overflow: "hidden"
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


          <div style={filePathContainer}>
            <div style={{flex: "1"}}>File Path: </div>
            <div style={fileTextStyle}>{this.state.filePath}</div>
          </div>

          <div style={addCancelStyle}>
            <Link to="/settings">
              <div>
                <button style={Object.assign({}, btnStyle, cancelBtn)}>Cancel</button>
              </div>
              <div>
                <button style={Object.assign({}, btnStyle, addBtn)} onClick={this.addFileSetting}>Add</button>

              </div>
            </Link>
          </div>

        </div>
        <SideBar />
      </div>
    )
  }
}