import reducer from '@helpers/reducer';
import { SearchState, SearchAction } from '@t/app';
import apiConfig from '@api/api.config';

const initialState: SearchState = {
    display: {},
    query: '',
    repos: {},
    page: 1,
    per_page: apiConfig.defaults.per_page,
    shouldFetch: false
};

export default reducer(initialState, {
    ['CALL_SEARCH']: (state: SearchState, action: SearchAction) => {
        const displayItems = action.payload.repos! && action.payload.repos!.items;
        let display = {};
        if (displayItems) {
            display = Object.assign(
                state.display,
                { [action.payload.page as number]: displayItems }
            );
        }

        return {
            ...state,
            ...action.payload,
            display
        };
    },
    ['DEFAULT']: (state: SearchState, action: SearchAction) => {
        return {
            ...state,
            ...action.payload
        };
    }
});
