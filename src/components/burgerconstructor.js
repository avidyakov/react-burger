import React, {useCallback, useState} from 'react';
import {Button, ConstructorElement, CurrencyIcon, LockIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerconstructor.module.css';
import {Modal} from './modal';
import OrderDetails from './order-details';
import {useDispatch, useSelector} from 'react-redux';
import {addIngredient, moveIngredient, removeIngredient, setBun} from '../services/actions/constructor';
import {createOrder, resetOrder} from '../services/actions/order';
import DroppableConstructor from './droppable-constructor';
import DraggableConstructorElement from './draggable-constructor-element';

export default function BurgerConstructor() {
    const dispatch = useDispatch();
    const {ingredients: allIngredients} = useSelector(state => state.ingredients);
    const {bun, ingredients} = useSelector(state => state.burgerConstructor);
    const {orderNumber, orderRequest, orderFailed} = useSelector(state => state.order);
    const [orderModal, setOrderModal] = useState(false);

    const handleAddIngredient = useCallback((ingredient) => {
        if (ingredient.type === 'bun') {
            dispatch(setBun(ingredient));
        } else {
            dispatch(addIngredient(ingredient));
        }
    }, [dispatch]);

    const handleRemoveIngredient = useCallback((uuid) => {
        dispatch(removeIngredient(uuid));
    }, [dispatch]);

    const handleMoveIngredient = useCallback((dragIndex, hoverIndex) => {
        dispatch(moveIngredient(dragIndex, hoverIndex));
    }, [dispatch]);

    const makeOrder = useCallback(() => {
        if (!bun) return;
        const ingredientIds = [bun._id];
        ingredients.forEach(item => ingredientIds.push(item._id));
        ingredientIds.push(bun._id);
        dispatch(createOrder(ingredientIds));
        setOrderModal(true);
    }, [dispatch, bun, ingredients]);

    const closeOrder = useCallback(() => {
        setOrderModal(false);
        dispatch(resetOrder());
    }, [dispatch]);

    const price = (bun ? bun.price * 2 : 0) +
        ingredients.reduce((sum, item) => sum + item.price, 0);

    return (
        <section className="pt-25 pl-4 pr-4">
            <DroppableConstructor onDrop={handleAddIngredient}>
                {bun && (
                    <div className={styles.bun}>
                        <div className={styles.lock}>
                            <LockIcon type="primary"/>
                        </div>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                )}

                <div className={styles.scroll}>
                    {ingredients.map((ing, index) => (
                        <DraggableConstructorElement
                            key={ing.uuid}
                            ingredient={ing}
                            index={index}
                            handleRemove={handleRemoveIngredient}
                            handleMove={handleMoveIngredient}
                        />
                    ))}
                </div>

                {bun && (
                    <div className={styles.bun}>
                        <div className={styles.lock}>
                            <LockIcon type="primary"/>
                        </div>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                )}

                <div className={styles.order}>
                    <div className={styles.sum}>
                        <p className="text text_type_digits-medium mr-2">{price}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary" size="large" onClick={makeOrder} disabled={!bun || ingredients.length === 0}>
                        Оформить заказ
                    </Button>
                </div>
            </DroppableConstructor>

            {orderModal && (
                <Modal onClose={closeOrder}>
                    <OrderDetails orderNumber={orderNumber}/>
                </Modal>
            )}
        </section>
    );
}
