import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients';
import {constructorReducer} from './constructor';
import {orderReducer} from './order';
import {ingredientDetailsReducer} from './ingredient-details';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetailsReducer
});