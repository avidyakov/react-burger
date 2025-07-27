import {RESET_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT} from '../constants/ingredient-details';

export const setCurrentIngredient = (ingredient) => {
    return {
        type: SET_CURRENT_INGREDIENT,
        payload: ingredient
    };
};

export const resetCurrentIngredient = () => {
    return {
        type: RESET_CURRENT_INGREDIENT
    };
};