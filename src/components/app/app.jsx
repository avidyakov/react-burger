import React from 'react';
import styles from './app.module.css';
import Header from '../header';
import BurgerIngredients from "../burgeringredients";
import BurgerConstructor from "../burgerconstructor";

function App() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.success) {
                    setData(data.data);
                } else {
                    throw new Error('Failed to fetch ingredients: API returned success: false');
                }
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    }, [])

    return (
        <div className={styles.app}>
            <Header/>
            <main className={styles.content}>
                <div className={styles.container}>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
                </div>
            </main>
        </div>
    );
}

export default App;