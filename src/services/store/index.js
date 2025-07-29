import {applyMiddleware, createStore} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import {rootReducer} from '../reducers';

const enhancer = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);