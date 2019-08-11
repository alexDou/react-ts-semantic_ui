import React from 'react';
import renderer from 'react-test-renderer';
import { Form, Button } from 'semantic-ui-react';

import Root from '../Root';
import SearchContainer from '../search';
import { BrowserRouter } from 'react-router-dom';

describe('search container', () => {
    it('has form element with a button', () => {
        const sehoc = renderer.create(
            <Root iniStore={{} as any}>
                <BrowserRouter>
                    <SearchContainer
                        size="large"
                        color="black"
                        stacked={true}
                        disabled={false}
                        query=""
                    />
                </BrowserRouter>
            </Root>
        );
        const sehocInstance = sehoc.root;

        expect(sehocInstance.findByType(Form).findByType(Button)).toBeDefined();
    });

    it('matches snapshot', () => {
        const sehoc = renderer.create(
            <Root iniStore={{} as any}>
                <BrowserRouter>
                    <SearchContainer
                        size="large"
                        color="black"
                        stacked={true}
                        disabled={false}
                        query=""
                    />
                </BrowserRouter>
            </Root>
        );
        const sehocInstance = sehoc.root;

        expect(sehocInstance).toMatchSnapshot();
        sehoc.unmount();
    });
});
