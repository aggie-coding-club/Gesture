import React, {Component} from "react";

export default class CameraOption extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.toggleChange = this.toggleChange.bind(this);
  }

  toggleChange() {
    this.props.btnClick("Camera");
  }

  render() {
    const btnContainer = {
      padding: "10vh 0 10vh 0"
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
      flexDirection: "row"
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

    return(
      <div style={btnContainer}>
        {/* {shown ? <VideoModal/> : null}
      <button style={btnStyle} onClick={() => setShown(!shown)}> */}
        <button style={btnStyle} onClick={this.toggleChange}>
          <div style={imageStyle}>
            <img src={this.props.icon} alt="camera" height="auto" width="25px"/>
          </div>
          <div style={wordStyle}>
            <p style={word}>Camera</p>
          </div>
        </button>
      </div>
    )
  }
}

function FunctionCameraOption({btnClick, icon}) {
  const [shown, setShown] = React.useState(false)

  function toggleChange() {
    btnClick("Camera");
  }

  const btnContainer = {
    padding: "10vh 0 10vh 0"
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
    flexDirection: "row"
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

  return(
    <div style={btnContainer}>
      {/* {shown ? <VideoModal/> : null}
      <button style={btnStyle} onClick={() => setShown(!shown)}> */}
      <button style={btnStyle} onClick={toggleChange}>
        <div style={imageStyle}>
          <img src={icon} alt="camera" height="auto" width="25px"/>
        </div>
        <div style={wordStyle}>
          <p style={word}>Camera</p>
        </div>
      </button>
    </div>
  )
}

// const VideoModal = () => {
//   const videoStyle = {
//     height: "100%",
//     width: "100%",
//     border: "none",
//     position: "relative",
//     left: "-10px",
//     top: "-10px",
//   };

//   return <iframe
//       style={videoStyle}
//       src={'http://127.0.0.1:5000/'}
//       scrolling={"no"}>
//     </iframe>
// }
