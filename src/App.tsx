import React from 'react';
import './App.css';
import Header from './components/header';
import BurgerIngredients from "./components/burgeringredients";

function App() {
    const [data, setData] = React.useState([]);

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
                <BurgerIngredients data={data}/>
            </main>
        </div>
    );
}

export default App;
