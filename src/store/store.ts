import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';

const composeEnhancers = composeWithDevTools({
    serialize: true
});

const middlewares = [thunk, createLogger];

export default (iniStore = {}) =>
    createStore(
        combineReducers(reducers),
        iniStore,
        composeEnhancers(applyMiddleware(...middlewares))
    );
