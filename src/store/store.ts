import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';

const composeEnhancers = composeWithDevTools({
    trace: true,
    serialize: true
});

const middlewares = [thunk, createLogger];

export default (iniStore = {}): Store =>
    createStore(
        combineReducers(reducers as any),
        iniStore,
        composeEnhancers(applyMiddleware(...middlewares))
    );
