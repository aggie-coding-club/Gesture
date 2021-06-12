import React, {Component } from 'react';
import { ipcRenderer } from 'electron';

const {
  CATCH_ON_MAIN,
  SEND_TO_RENDERER,
  CREATE_FILE,
} = require('../../../utils/constants')

class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
    this.writeClick = this.writeClick.bind(this);
  }
  componentDidMount() {
    ipcRenderer.on(SEND_TO_RENDERER, this.handleRenderer)
  }
  componentWillUnmount() {
    ipcRenderer.removeListener(SEND_TO_RENDERER, this.handleRenderer)
  }

  handleRenderer(event, data) {
    console.log('handleRenderer', data);
  }
  handleOnClick() {
    console.log('handleOnClick');
    ipcRenderer.send(CATCH_ON_MAIN, 'ping');
  }
  writeClick() {
    console.log("Sending info for file ...");
    ipcRenderer.send(CREATE_FILE, '10001010111001');
  }
  render() {
    return (
      <div>
        <h1>Hello, Electron!</h1>
        <p>yohooooo</p>
        <button onClick={this.handleOnClick}>Send!</button>
        <button onClick={this.writeClick}>Write File</button>
      </div>
    )
  }

}

export default HelloWorld;
