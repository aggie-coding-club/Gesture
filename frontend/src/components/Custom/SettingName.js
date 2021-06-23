import React, {Component} from 'react'

export default class SettingName extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.updateName(event.target.value)
  }

  render() {
    const containerStyle = {
      margin: "10vh 5vw 5vh 5vw",
      display: "flex"
    }

    const textInputStyle = {
      border: "1px black solid",
      marginLeft: "10px",
      borderRadius: "10px",
      textAlign: "center",
      flex: "4",
      overflow: "hidden",
      backgroundColor: "#ececec",
    }

    return (
      <div>
        <label  style={containerStyle}>
          <div style={{flex: 1}}>
            Setting Name:
          </div>
          <input
            type="text"
            value={this.props.name}
            onChange={this.handleChange}
            style={textInputStyle}
            placeholder="Enter name of custom setting"
          />
        </label>
      </div>
    );
  }
}
