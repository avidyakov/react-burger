import React, {useRef} from 'react';
import {useDrag} from 'react-dnd';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgeringredients.module.css';
import PropTypes from 'prop-types';

const IngredientItem = ({ingredient, count, onClick}) => {
    const ref = useRef(null);

    const [{isDragging}, dragRef] = useDrag({
        type: 'ingredient',
        item: {...ingredient},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    dragRef(ref);

    return (
        <div
            ref={ref}
            className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
            style={{opacity: isDragging ? 0.4 : 1}}
        >
            <div onClick={() => onClick(ingredient)}>
                <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className={styles.img}
                />
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`${styles.name} text text_type_main-default`}>
                    {ingredient.name}
                </p>
            </div>
            <Counter count={count} size="default"/>
        </div>
    );
};

IngredientItem.propTypes = {
    ingredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired,
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default IngredientItem;