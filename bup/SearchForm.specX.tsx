import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Button } from 'semantic-ui-react';

import SearchForm from '../SearchForm';

describe('SearchForm component', () => {
    it('renders itself', () => {
        const sf = renderer.create(
            <SearchForm
                size={'large'}
                stacked={true}
                color={'black'}
                disabled={false}
                query={'qq'}
                onFormSubmit={(q) => {}}
            />
        );
        const sfInstance = sf.root;

        expect(sfInstance).toMatchSnapshot();
        sf.unmount();
    });

    it('handles submit event', () => {
        const mockSubmit = jest.fn();
        const sf = mount(
            <SearchForm
                size={'large'}
                stacked={true}
                color={'black'}
                disabled={false}
                query={'qq'}
                onFormSubmit={mockSubmit}
            />
        );

        sf.find(Button).simulate('click');
        expect(mockSubmit).toHaveBeenCalled();
        sf.unmount();
    });
});
