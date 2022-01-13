import React, {useState } from "react";
import "./App.css";
import Environment from "./components/Game_environment/environment";
import Header from "./components/header/header";
function App() {

  const [results,setResults] = useState({user : 0 , computer : 0 , equal : 0});
  
  const setResult = (key) => {
    results[key]++
    setResults({...results});
  };

  const resetGame = () => {
    setResults({user : 0 , computer : 0 , equal : 0})
  }
  return (
    <div className="Container">
      <header>
        <h1>Tic Tac Toe Game</h1>
        <Header result = {results} />
      </header>
      <main>
        <Environment reset={resetGame} setresult={setResult} />
      </main>
    </div>
  );
}

export default App;
