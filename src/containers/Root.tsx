import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { RootProps } from '@t/app';
import store from '@store/store';

const Root = ({ iniStore, children }: RootProps): ReactElement => {
    return (
        <Provider store={store(iniStore)}>
            {children}
        </Provider>
    );
};

export default Root;
