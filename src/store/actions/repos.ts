import { TDispatch, ActionType, ThunkActionCreate } from '@t/app';
import { api } from '@api/index';
import { session } from './';
import { CALL_SEARCH, FIND_QUERY, TURN_PAGE } from '../action_types';

const getSearch: ThunkActionCreate = (query: string, page: number) => {

    return async (dispatch: TDispatch): Promise<ActionType> => {
        try {
            dispatch(session.pending());
            const response: any = await api.search_repos(query, page);

            const payload: {page: number; repos: any; shouldFetch: boolean; display?: any} = {
                page,
                repos: response.data,
                shouldFetch: false
            }

            if (response.data.total_count === 0) {
                payload.display = {}
            }

            dispatch({
                type: CALL_SEARCH,
                payload
            });
            return dispatch(session.fulfilled());
        } catch (err) {
            return dispatch(session.failed(err.message));
        }
    };
};

const setSearchQuery = (query: string) => {
    return {
        type: FIND_QUERY,
        payload: { display: {}, page: 1, query, repos: {}, shouldFetch: true }
    };
};

const setPage = (page: number, shouldFetch: boolean) => {
    return {
        type: TURN_PAGE,
        payload: { page, shouldFetch }
    };
};

export default { getSearch, setSearchQuery, setPage };
