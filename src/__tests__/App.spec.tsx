import React from 'react';
import ReactDOM from 'react-dom';

import App from '../App';
import {
    CALL_SEARCH, TURN_PAGE, FIND_QUERY, REQ_PENDING, REQ_FULFILLED, REQ_FAILED
} from '@store/action_types';
import store from '@store/store';
import { http } from '../transport';
import apiConfig from '@api/api.config';
import { api } from '../api';

describe('app at startup', function() {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('has all action types', () => {
        expect(CALL_SEARCH).toBeDefined();
        expect(TURN_PAGE).toBeDefined();
        expect(FIND_QUERY).toBeDefined();
        expect(REQ_PENDING).toBeDefined();
        expect(REQ_FULFILLED).toBeDefined();
        expect(REQ_FAILED).toBeDefined();
    });

    it('has store initialized', () => {
        expect(store().dispatch instanceof Function).toBe(true);
        expect(store().subscribe instanceof Function).toBe(true);
        expect(store().replaceReducer instanceof Function).toBe(true);
    });

    it('has HTTP transport', () => {
        expect(http instanceof Function).toBe(true);
    });

    it('has API endpoints', () => {
        expect(api.search_repos).toBeDefined();
        expect(apiConfig.apiBaseUrl && /^http(s)?:\/\//.test(apiConfig.apiBaseUrl)).toBe(true);
    });
});
