import {CREATE_ORDER_FAILED, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, RESET_ORDER} from '../constants/order';

const initialState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
    error: null
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                error: null
            };
        }
        case CREATE_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderRequest: false,
                orderFailed: false
            };
        }
        case CREATE_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
                error: action.error
            };
        }
        case RESET_ORDER: {
            return {
                ...initialState
            };
        }
        default: {
            return state;
        }
    }
};