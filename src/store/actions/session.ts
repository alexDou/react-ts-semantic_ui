import { REQ_PENDING, REQ_FULFILLED, REQ_FAILED } from '../action_types';
import { StoreAction } from '@t/app';

const actions = {
    pending: (): StoreAction => ({ type: REQ_PENDING }),

    fulfilled: (): StoreAction => ({ type: REQ_FULFILLED }),

    failed: (message: string): StoreAction => {
        return {
            type: REQ_FAILED,
            payload: { message }
        };
    }
};

export default actions;
