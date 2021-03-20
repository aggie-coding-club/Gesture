import './App.css';
import SideBar from "./components/SideBar";
import CameraScreen from "./components/CameraScreen";

function App() {
  const flexContainer = {
    display: "flex",
    backgroundColor: "blue"
  }

  const sideScreen = {
    background: "grey",
    width: "20vw",
    height: "100vh"


  }
  const cameraScreen = {

    background: "green",
    width: "80vw"

  }
  return (
    <div style={flexContainer}>
      <div style={sideScreen}>
        <SideBar/>
      </div>
      <div style={cameraScreen}>
        <CameraScreen />
      </div>
    </div>
  );
}

export default App;
