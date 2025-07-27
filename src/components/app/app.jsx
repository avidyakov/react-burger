import React from 'react';
import {useDispatch} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import styles from './app.module.css';
import Header from '../header';
import BurgerIngredients from "../burgeringredients";
import BurgerConstructor from "../burgerconstructor";
import {getIngredients} from '../../services/actions/ingredients';

function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [])

    return (
        <div className={styles.app}>
            <Header/>
            <main className={styles.content}>
                <DndProvider backend={HTML5Backend}>
                    <div className={styles.container}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </div>
                </DndProvider>
            </main>
        </div>
    );
}

export default App;