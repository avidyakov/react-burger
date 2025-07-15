import React, {useState} from 'react';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from './modal';
import IngredientDetails from './ingredient-details';
import styles from './burgeringredients.module.css';

export default function BurgerIngredients({data}) {
    const [tab, setTab] = useState('bun');
    const [ingr, setIngr] = useState(null);
    const [modal, setModal] = useState(false);

    const tabClick = (val) => {
        setTab(val);
    };

    const clickIngr = (ing) => {
        setIngr(ing);
        setModal(true);
    };

    const hideModal = () => {
        setModal(false);
        setIngr(null);
    };

    const showCategory = (typ, name) => {
        const items = data.filter(item => item.type === typ);

        return (
            <div className="mb-10">
                <h3 className="text text_type_main-medium mb-6">{name}</h3>
                <div className={styles.grid}>
                    {items.map(ing => (
                        <div
                            key={ing._id}
                            className={styles.card}
                            onClick={() => clickIngr(ing)}
                        >
                            <img
                                src={ing.image}
                                alt={ing.name}
                                className={styles.img}
                            />
                            <div className={styles.price}>
                                <p className="text text_type_digits-default mr-2">{ing.price}</p>
                                <CurrencyIcon type="primary"/>
                            </div>
                            <p className={`${styles.name} text text_type_main-default`}>
                                {ing.name}
                            </p>
                            <Counter count={0} size="default"/>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section className="pt-10 pl-5 pr-5">
            <h2 className="text text_type_main-large mb-6">Соберите бургер</h2>

            <div className="mb-10">
                <div style={{display: 'flex'}}>
                    <Tab value="bun" active={tab === 'bun'} onClick={tabClick}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={tab === 'sauce'} onClick={tabClick}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={tab === 'main'} onClick={tabClick}>
                        Начинки
                    </Tab>
                </div>
            </div>

            <div className={styles.container}>
                {showCategory('bun', 'Булки')}
                {showCategory('sauce', 'Соусы')}
                {showCategory('main', 'Начинки')}
            </div>

            {modal && (
                <Modal title="Детали ингредиента" onClose={hideModal}>
                    <IngredientDetails ingredient={ingr}/>
                </Modal>
            )}
        </section>
    );
}
