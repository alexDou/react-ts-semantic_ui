import * as actions from '../actions';
import * as reducers from '../reducers';
import { REQ_PENDING, REQ_FULFILLED, REQ_FAILED, FIND_QUERY, CALL_SEARCH, TURN_PAGE } from '../action_types';
import apiConfig from '@api/api.config';

const initialState = {
    session: {
        pending: false,
        ok: true,
        failure: false,
        message: ''
    },
    repos: {
        display: {},
        query: '',
        repos: {},
        page: 1,
        per_page: apiConfig.defaults.per_page,
        shouldFetch: false
    }
};

describe('store has action', () => {
    it('session pending', () => {
        const expected = { type: REQ_PENDING };

        expect(actions.session.pending()).toEqual(expected);
    });

    it('session fulfilled', () => {
        const expected = { type: REQ_FULFILLED };

        expect(actions.session.fulfilled()).toEqual(expected);
    });

    it('session failed', () => {
        const expected = {
            type: REQ_FAILED,
            payload: { message: 'error occurred' },
        };

        expect(actions.session.failed('error occurred')).toEqual(expected);
    });

    it('set search query', () => {
        const expected = {
            type: FIND_QUERY,
            payload: { display: {}, page: 1, query: 'query', repos: {}, shouldFetch: true }
        }

        expect(actions.repos.setSearchQuery('query')).toEqual(expected);
    });

    it('set search page', () => {
        const expected = {
            type: TURN_PAGE,
            payload: { page: 20, shouldFetch: true }
        }

        expect(actions.repos.setPage(20, true)).toEqual(expected);
    });

    // it('fetches data from API', () => {
    //      // stub with moxios
    //      // tbd. some other day
    // });
    //
    it('has REQ_PENDING reducer', () => {
        const action = { type: REQ_PENDING };

        const newState = reducers.session(initialState.session, action);

        expect(newState.pending).toBe(true);
    });

    it('has REQ_FULFILLED reducer', () => {
        const action = { type: REQ_FULFILLED };

        const newState = reducers.session({ ...initialState.session, pending: true }, action);

        expect(newState.pending).toBe(false);
        expect(newState.ok).toBe(true);
    });

    it('has REQ_FAILED reducer', () => {
        const action = { type: REQ_FAILED, payload: { message: 'failed' } };

        const newState = reducers.session(initialState.session, action);

        expect(newState.message).toBe('failed');
        expect(newState.failure).toBe(true);
    });

    it('has FIND_QUERY reducer', () => {
        const action = {
            type: FIND_QUERY,
            payload: { display: {}, query: 'test', repos: {}, shouldFetch: true }
        };

        const newState = reducers.repos(initialState.repos, action);

        expect(newState.query).toBe('test');
        expect(newState.shouldFetch).toBe(true);
    });

    it('has CALL_SEARCH reducer', () => {
        const action = {
            type: CALL_SEARCH,
            payload: { page: 10, repos: [{id: 'repoId'}], shouldFetch: false }
        };

        const newState = reducers.repos(initialState.repos, action);

        expect(newState.page).toBe(10);
        expect(newState.repos[0].id).toBe('repoId');
        expect(newState.shouldFetch).toBe(false);
    });

    it('has TURN_PAGE reducer', () => {
        const action = {
            type: TURN_PAGE,
            payload: { page: 10, shouldFetch: true }
        };

        const newState = reducers.repos(initialState.repos, action);

        expect(newState.page).toBe(10);
        expect(newState.shouldFetch).toBe(true);
    });
});
