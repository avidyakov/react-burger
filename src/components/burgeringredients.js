import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructor from "./burgerconstructor";

export default function BurgerIngredients({data}) {
    const [current, setCurrent] = useState('buns');

    const handleTabClick = (value) => {
        setCurrent(value);
    };

    return (
        <section className="pt-10 pl-5 pr-5">
            <h2 className="text text_type_main-large mb-6">Соберите бургер</h2>

            <div className="mb-10">
                <div style={{display: 'flex'}}>
                    <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={handleTabClick}>
                        Начинки
                    </Tab>
                </div>
            </div>

            <div className="mb-10">
                <h3 className="text text_type_main-medium mb-6">Начинки</h3>
                <BurgerConstructor currentIngredient={current} data={data}/>
            </div>
        </section>
    )
}
