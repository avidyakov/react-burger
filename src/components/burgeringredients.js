import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from './modal';
import IngredientDetails from './ingredient-details';
import IngredientCategory from './ingredient-category';
import styles from './burgeringredients.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {addIngredient, setBun} from '../services/actions/constructor';
import {resetCurrentIngredient, setCurrentIngredient} from '../services/actions/ingredient-details';

export default function BurgerIngredients() {
    const dispatch = useDispatch();
    const {ingredients} = useSelector(state => state.ingredients);
    const {bun, ingredients: constructorIngredients} = useSelector(state => state.burgerConstructor);
    const {currentIngredient} = useSelector(state => state.ingredientDetails);
    const data = ingredients;
    const [tab, setTab] = useState('bun');
    const [modal, setModal] = useState(false);

    const containerRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const tabClick = useCallback((val) => {
        setTab(val);

        if (val === 'bun' && bunRef.current) {
            bunRef.current.scrollIntoView({behavior: 'smooth'});
        } else if (val === 'sauce' && sauceRef.current) {
            sauceRef.current.scrollIntoView({behavior: 'smooth'});
        } else if (val === 'main' && mainRef.current) {
            mainRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (!bunRef.current || !sauceRef.current || !mainRef.current) return;

            const bunPosition = Math.abs(bunRef.current.getBoundingClientRect().top - container.getBoundingClientRect().top);
            const saucePosition = Math.abs(sauceRef.current.getBoundingClientRect().top - container.getBoundingClientRect().top);
            const mainPosition = Math.abs(mainRef.current.getBoundingClientRect().top - container.getBoundingClientRect().top);

            const minPosition = Math.min(bunPosition, saucePosition, mainPosition);

            if (minPosition === bunPosition) {
                setTab('bun');
            } else if (minPosition === saucePosition) {
                setTab('sauce');
            } else {
                setTab('main');
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const clickIngr = useCallback((ing) => {
        dispatch(setCurrentIngredient(ing));
        setModal(true);
    }, [dispatch]);

    const hideModal = useCallback(() => {
        setModal(false);
        dispatch(resetCurrentIngredient());
    }, [dispatch]);

    const handleAddIngredient = useCallback((ingredient) => {
        if (ingredient.type === 'bun') {
            dispatch(setBun(ingredient));
        } else {
            dispatch(addIngredient(ingredient));
        }
    }, [dispatch]);

    const getCount = useCallback((id) => {
        if (!bun && !constructorIngredients.length) return 0;

        let count = 0;
        if (bun && bun._id === id) {
            count = 2; // Top and bottom buns
        }

        constructorIngredients.forEach(item => {
            if (item._id === id) {
                count += 1;
            }
        });

        return count;
    }, [bun, constructorIngredients]);

    return (
        <section className="pt-10 pl-5 pr-5">
            <h2 className="text text_type_main-large mb-6">Соберите бургер</h2>

            <div className="mb-10">
                <div className={styles.tabs}>
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

            <div className={styles.container} ref={containerRef}>
                <IngredientCategory
                    title="Булки"
                    items={data.filter(item => item.type === 'bun')}
                    itemRef={bunRef}
                    onItemClick={clickIngr}
                    onItemDrop={handleAddIngredient}
                    getCount={getCount}
                />
                <IngredientCategory
                    title="Соусы"
                    items={data.filter(item => item.type === 'sauce')}
                    itemRef={sauceRef}
                    onItemClick={clickIngr}
                    onItemDrop={handleAddIngredient}
                    getCount={getCount}
                />
                <IngredientCategory
                    title="Начинки"
                    items={data.filter(item => item.type === 'main')}
                    itemRef={mainRef}
                    onItemClick={clickIngr}
                    onItemDrop={handleAddIngredient}
                    getCount={getCount}
                />
            </div>

            {modal && (
                <Modal title="Детали ингредиента" onClose={hideModal}>
                    <IngredientDetails ingredient={currentIngredient}/>
                </Modal>
            )}
        </section>
    );
}
