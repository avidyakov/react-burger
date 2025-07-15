import React from 'react';
import './App.css';
import Header from './components/header';
import BurgerIngredients from "./components/burgeringredients";
import BurgerConstructor from "./components/burgerconstructor";

function App() {
    const [data, setData] = React.useState([]);
    const [currentIngredient, setCurrentIngredient] = React.useState('bun');

    React.useEffect(() => {
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(response => response.json())
            .then(data => {
                if (data && data.success) {
                    setData(data.data);
                } else {
                    console.error('Failed to fetch ingredients:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    }, [])

    return (
        <div className="App">
            <Header/>
            <main className="content">
                <div className="container">
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor currentIngredient={currentIngredient} data={data}/>
                </div>
            </main>
        </div>
    );
}

export default App;
