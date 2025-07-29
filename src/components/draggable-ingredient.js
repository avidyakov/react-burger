import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {useDrag} from 'react-dnd';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgeringredients.module.css';

const DraggableIngredient = ({ingredient, count, onClick, onDrop}) => {
    const ref = useRef(null);

    const [{isDragging}, drag] = useDrag({
        type: 'ingredient',
        item: {id: ingredient._id, ingredient},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(ref);

    return (
        <div
            ref={ref}
            className={styles.card}
            style={{opacity: isDragging ? 0.5 : 1}}
        >
            <div onClick={onClick}>
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

DraggableIngredient.propTypes = {
    ingredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired,
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    onDrop: PropTypes.func
};

export default DraggableIngredient;