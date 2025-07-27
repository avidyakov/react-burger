import {ADD_INGREDIENT, CLEAR_CONSTRUCTOR, MOVE_INGREDIENT, REMOVE_INGREDIENT, SET_BUN} from '../constants/constructor';
import {v4 as uuidv4} from 'uuid';

export const addIngredient = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...ingredient,
            uuid: uuidv4()
        }
    };
};

export const setBun = (bun) => {
    return {
        type: SET_BUN,
        payload: bun
    };
};

export const removeIngredient = (uuid) => {
    return {
        type: REMOVE_INGREDIENT,
        payload: uuid
    };
};

export const moveIngredient = (dragIndex, hoverIndex) => {
    return {
        type: MOVE_INGREDIENT,
        payload: {dragIndex, hoverIndex}
    };
};

export const clearConstructor = () => {
    return {
        type: CLEAR_CONSTRUCTOR
    };
};