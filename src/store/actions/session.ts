import { REQ_PENDING, REQ_FULFILLED, REQ_FAILED } from '../action_types';

const actions = {
    pending: () => ({ type: REQ_PENDING }),

    fulfilled: () => ({ type: REQ_FULFILLED }),

    failed: (message: string) => {
        return {
            type: REQ_FAILED,
            payload: { message }
        };
    }
};

export default actions;
