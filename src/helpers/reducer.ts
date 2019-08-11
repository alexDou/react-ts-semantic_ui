/**
 * Allows for Object type of handlers
 * @author Vladimir Shestakov boolive@yandex.ru
 *
 * @param initState Object
 * @param handlers Object
 * @return {Function} reducer handler
 */
export default function reducer(initState: any, handlers: any) {
    return (state = initState, action: any = {}) => {
        if (handlers[action.type]) {
            return handlers[action.type](state, action);
        } else if (handlers['DEFAULT']) {
            return handlers['DEFAULT'](state, action);
        }

        return state;
    };
}
