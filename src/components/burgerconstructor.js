import React, {useState} from 'react';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
    LockIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerconstructor.module.css';
import {Modal} from './modal';
import OrderDetails from './order-details';

export default function BurgerConstructor({data}) {
    const [orderModal, setOrderModal] = useState(false);
    const [num, setNum] = useState(null);

    const makeOrder = () => {
        setNum(123);
        setOrderModal(true);
    };

    const closeOrder = () => {
        setOrderModal(false);
    };

    const bun = data.find(item => item.type === 'bun');

    const ingredients = data.filter(item => item.type !== 'bun');

    const price = (bun ? bun.price * 2 : 0) +
        ingredients.reduce((sum, item) => sum + item.price, 0);

    return (
        <section className="pt-25 pl-4 pr-4">
            <div className={styles.box}>
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
                    {ingredients.map(ing => (
                        <div key={ing._id} className={`${styles.element} mb-4`}>
                            <div className={styles.drag}>
                                <DragIcon type="primary"/>
                            </div>
                            <ConstructorElement
                                text={ing.name}
                                price={ing.price}
                                thumbnail={ing.image}
                                handleClose={() => {
                                    console.log('Removed ingredient');
                                }}
                            />
                        </div>
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
                    <Button type="primary" size="large" onClick={makeOrder}>
                        Оформить заказ
                    </Button>
                </div>
            </div>

            {orderModal && (
                <Modal onClose={closeOrder}>
                    <OrderDetails orderNumber={num}/>
                </Modal>
            )}
        </section>
    );
}
