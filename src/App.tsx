import React from 'react';
import './App.css';
import Header from './components/header';
import BurgerIngredients from "./components/burgeringredients";

function App() {
  return (
    <div className="App">
        <Header/>
        <main className="content">
            <BurgerIngredients/>
        </main>
    </div>
  );
}

export default App;
