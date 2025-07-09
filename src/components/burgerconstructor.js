import React from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerconstructor.module.css';
import {mockData} from '../data.js';

export default function BurgerConstructor({currentIngredient}) {
    return (
        <section className="pt-25 pl-4 pr-4">
            <div className={styles.constructorContainer}>
                <div className={styles.scrollableContainer}>
                    {mockData.filter(item => item.type === currentIngredient).map(ingredient => (
                        <div key={ingredient.id} className={`${styles.constructorElement} mb-4`}>
                            <div className={styles.dragIcon}>
                                <DragIcon type="primary"/>
                            </div>
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail="https://code.s3.yandex.net/react/code/sauce-02.png"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}