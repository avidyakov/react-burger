import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-details.module.css';

const OrderDetails = ({orderNumber}) => {
    return (
        <div className={styles.wrapper}>
            <p className={`${styles.num} text text_type_digits-large`}>
                {orderNumber}
            </p>
            <p className={`${styles.id} text text_type_main-medium`}>
                идентификатор заказа
            </p>
            <img alt="Заказ принят" className={styles.img}/>
            <p className={`${styles.msg} text text_type_main-default`}>
                Ваш заказ начали готовить
            </p>
            <p className={`${styles.txt} text text_type_main-default text_color_inactive`}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired
};

export default OrderDetails;
