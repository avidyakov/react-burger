import {ADD_INGREDIENT, CLEAR_CONSTRUCTOR, MOVE_INGREDIENT, REMOVE_INGREDIENT, SET_BUN} from '../constants/constructor';

const initialState = {
    bun: null,
    ingredients: []
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUN: {
            return {
                ...state,
                bun: action.payload
            };
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.uuid !== action.payload)
            };
        }
        case MOVE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            const {dragIndex, hoverIndex} = action.payload;
            const dragItem = ingredients[dragIndex];

            ingredients.splice(dragIndex, 1);
            ingredients.splice(hoverIndex, 0, dragItem);

            return {
                ...state,
                ingredients
            };
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...initialState
            };
        }
        default: {
            return state;
        }
    }
};