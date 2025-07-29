import {CREATE_ORDER_FAILED, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, RESET_ORDER} from '../constants/order';

export function createOrder(ingredients) {
    return function (dispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: ingredients
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.success) {
                    dispatch({
                        type: CREATE_ORDER_SUCCESS,
                        orderNumber: data.order.number
                    });
                } else {
                    throw new Error('Failed to create order: API returned success: false');
                }
            })
            .catch(error => {
                console.error('Error creating order:', error);
                dispatch({
                    type: CREATE_ORDER_FAILED,
                    error: error.message
                });
            });
    };
}

export function resetOrder() {
    return {
        type: RESET_ORDER
    };
}