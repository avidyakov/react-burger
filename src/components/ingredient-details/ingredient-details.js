import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ingredient}) => {
    if (!ingredient) return null;

    return (
        <div className={styles.box}>
            <img
                src={ingredient.image_large}
                alt={ingredient.name}
                className={styles.pic}
            />
            <h3 className={`${styles.title} text text_type_main-medium`}>
                {ingredient.name}
            </h3>
            <div className={styles.info}>
                <div className={styles.item}>
                    <p className={`${styles.label} text text_type_main-default text_color_inactive`}>
                        Калории,ккал
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient.calories}
                    </p>
                </div>
                <div className={styles.item}>
                    <p className={`${styles.label} text text_type_main-default text_color_inactive`}>
                        Белки, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient.proteins}
                    </p>
                </div>
                <div className={styles.item}>
                    <p className={`${styles.label} text text_type_main-default text_color_inactive`}>
                        Жиры, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient.fat}
                    </p>
                </div>
                <div className={styles.item}>
                    <p className={`${styles.label} text text_type_main-default text_color_inactive`}>
                        Углеводы, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient.carbohydrates}
                    </p>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired
    })
};

export default IngredientDetails;
