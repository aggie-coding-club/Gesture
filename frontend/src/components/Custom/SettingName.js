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

    const textInputStyle = {
      border: "1px black solid",
      marginLeft: "10px",
      borderRadius: "10px",
      textAlign: "center",
      flex: "5",
      overflow: "hidden",
      backgroundColor: "#ececec",

    }


    return (
      <form >
        <label>
          Setting Name:
          <input type="text" value={this.props.name} onChange={this.handleChange} style={textInputStyle} />
        </label>


      </form>
    );
  }
}
