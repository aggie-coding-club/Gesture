import './App.css';
import MainLayout from "./components/MainScreen/MainLayout";
import SettingsLayout from "./components/Settings/SettingsLayout"

function App() {

  const btnClick = (name) => {
    console.log("clicked", name)
  }

  //return mainlayout
  // return (
  //   <div>
  //     <MainLayout btnClick={btnClick}/>
  //   </div>
  // );

  return (
    <div>
      <SettingsLayout />
    </div>
  )
}

export default App;
