import reducer from '@helpers/reducer';
import { REQ_PENDING, REQ_FULFILLED, REQ_FAILED } from '@store/action_types';

import { SessionState, SessionAction } from '@t/app';

const initialState: SessionState = {
    pending: false,
    ok: true,
    failure: false,
    message: ''
};

export default reducer({
    initState: initialState,
    handlers: {
        [REQ_PENDING]: (state: SessionState): SessionState => {
            return {
                ...state,
                pending: true,
                ok: false
            };
        },

        [REQ_FULFILLED]: (): SessionState => {
            return {
                ...initialState
            };
        },

        [REQ_FAILED]: (
            state: SessionState,
            action: SessionAction
        ): SessionState => {
            return {
                ...state,
                pending: false,
                failure: true,
                ok: false,
                ...action.payload
            };
        }
    }
});
