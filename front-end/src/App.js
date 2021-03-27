import './App.css';
import MainLayout from "./components/MainScreen/MainLayout";

function App() {

  const btnClick = (name) => {
    console.log("clicked", name)
  }

  return (
    <div>
      <MainLayout btnClick={btnClick}/>

    </div>
  );
}

export default App;
