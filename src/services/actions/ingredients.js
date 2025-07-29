import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from '../constants/ingredients';

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: data.data
                    });
                } else {
                    throw new Error('Failed to fetch ingredients: API returned success: false');
                }
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                    error: error.message
                });
            });
    };
}