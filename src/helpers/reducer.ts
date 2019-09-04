/**
 * Allows for Object type of handlers
 * @author Vladimir Shestakov boolive@yandex.ru
 *
 * @param initState Object
 * @param handlers Object
 * @return {Function} reducer handler
 */
import { AppState, StoreAction } from '@t/app';

export default function reducer<K extends keyof AppState>({ initState, handlers }:
{ initState: AppState[K]; handlers: any }): Function
{
    // INVALID ACTION just a typescript shtick here. not handled anywhere
    return (state: AppState[K] = initState, action: StoreAction = { type: 'INVALID ACTION' }): AppState[K] => {
        if (handlers[action.type]) {
            return handlers[action.type](state, action);
        } else if (handlers['DEFAULT']) {
            return handlers['DEFAULT'](state, action);
        }

        return state;
    };
}
