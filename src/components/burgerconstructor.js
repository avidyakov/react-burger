import React, {useState} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerconstructor.module.css';
import {Modal} from './modal';
import OrderDetails from './order-details';

export default function BurgerConstructor({currentIngredient, data}) {
    const [orderModal, setOrderModal] = useState(false);
    const [num, setNum] = useState(null);

    const makeOrder = () => {
        setNum(123);
        setOrderModal(true);
    };

    const closeOrder = () => {
        setOrderModal(false);
    };

    const price = data.filter(item => item.type === currentIngredient)
        .reduce((sum, item) => sum + item.price, 0);

    return (
        <section className="pt-25 pl-4 pr-4">
            <div className={styles.box}>
                <div className={styles.scroll}>
                    {data.filter(item => item.type === currentIngredient).map(ing => (
                        <div key={ing._id} className={`${styles.element} mb-4`}>
                            <div className={styles.drag}>
                                <DragIcon type="primary"/>
                            </div>
                            <ConstructorElement
                                text={ing.name}
                                price={ing.price}
                                thumbnail={ing.image}
                            />
                        </div>
                    ))}
                </div>

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
