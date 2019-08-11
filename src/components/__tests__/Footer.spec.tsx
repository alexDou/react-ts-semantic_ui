import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Container, Pagination } from 'semantic-ui-react';

import Footer from '../Footer';

describe('Footer component', function () {
    it('renders itself if there are pages', () => {
        const footer = renderer.create(
            <Footer pages={100} active={1} pageChange={(pn) => {}} />
        );
        const footerInstance = footer.root;

        expect(footerInstance.findByType(Pagination)).toBeDefined();
        expect(footerInstance).toMatchSnapshot();
        footer.unmount();
    });

    it('handles change page event', () => {
        const mockPageChange = jest.fn();
        const footer = mount(
            <Footer pages={100} active={1} pageChange={mockPageChange} />
        );

        footer.find('a').at(6).simulate('click');
        expect(mockPageChange).toHaveBeenCalled();
        footer.unmount();
    })

    it('does not display footer on total results lt; 10', () => {
        const footer = renderer.create(
            <Footer pages={10} active={1} pageChange={(pn) => {}} />
        );
        const footerInstance = footer.root;

        try {
            footerInstance.findByType(Container);
            expect(true).toBe(false);
        } catch(e) {
            expect(e).toBeDefined();
        }
        footer.unmount();
    });
});
