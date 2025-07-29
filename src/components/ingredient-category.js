import React from 'react';
import PropTypes from 'prop-types';
import styles from './burgeringredients.module.css';
import DraggableIngredient from './draggable-ingredient';

const IngredientCategory = ({title, items, itemRef, onItemClick, onItemDrop, getCount}) => {
    return (
        <div className="mb-10" ref={itemRef}>
            <h3 className="text text_type_main-medium mb-6">{title}</h3>
            <div className={styles.grid}>
                {items.map(ingredient => (
                    <DraggableIngredient
                        key={ingredient._id}
                        ingredient={ingredient}
                        count={getCount(ingredient._id)}
                        onClick={() => onItemClick(ingredient)}
                        onDrop={() => onItemDrop(ingredient)}
                    />
                ))}
            </div>
        </div>
    );
};

IngredientCategory.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired
        })
    ).isRequired,
    itemRef: PropTypes.object,
    onItemClick: PropTypes.func.isRequired,
    onItemDrop: PropTypes.func.isRequired,
    getCount: PropTypes.func.isRequired
};

export default IngredientCategory;