import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import Root from '@containers/Root';
import Home from '@components/Home';
import SearchForm from '@components/SearchForm';
import SearchContainer from '@containers/search';
import {
    Segment, Container, Header
} from 'semantic-ui-react';

describe('Home component', function() {
    it('renders itself', () => {
        const home = shallow(
            <Home />
        );

        expect(home.find(Segment)).toHaveLength(1);
    });
    it('renders UI components', () => {
        const home = mount(
            <Root iniStore={{} as any}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Root>
        );

        expect(home.find(Container)).toHaveLength(2);
        expect(home.find(Header)).toHaveLength(2);

        home.unmount();
    });
    it('renders SearchContainer and SearchForm', () => {
        const home = mount(
            <Root iniStore={{} as any}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Root>
        );

        expect(home.find(SearchContainer)).toHaveLength(1);
        expect(home.find(SearchForm)).toHaveLength(1);
        home.unmount();
    });
    it('matches snapshot', () => {
        const home = mount(
            <Root iniStore={{} as any}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Root>
        );

        expect(home).toMatchSnapshot();
        home.unmount();
    });
});
