import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Root from '@containers/Root';
import Projects from '@components/Projects';
import SearchForm from '@components/SearchForm';
import SearchContainer from '@containers/search';
import {
    Segment, Card, Message
} from 'semantic-ui-react';

const activeState = {
    session: {
        pending: false,
        ok: true,
        failure: false,
        message: ''
    },
    repos: {
        display: {
            1: [{
                id: 'XZS-980',
                'full_name': 'test/repo',
                language: 'qq',
                'stargazers_count': 'infinity',
                owner: {
                    login: 'test',
                    'avatar_url': 'http://pp.dd'
                }
            }]
        },
        query: 'find something',
        page: 1,
        repos: [{
            "id": 123456,
            "node_id": "ABC=123",
            "name": "repo",
            "full_name": "author/repo",
            "private": false,
            "author": {
                "login": "author",
                "id": 654321,
                "node_id": "123=ABC",
                "avatar_url": "https://avatars0.githubusercontent.com/u/654321?v=4",
                "url": "https://api.github.com/users/author",
            },
            "html_url": "https://github.com/author/repo",
            "description": "Repo",
            "url": "https://api.github.com/repos/apollographql/react-apollo",
            "size": 12702,
            "stargazers_count": 5817,
            "watchers_count": 5817,
            "language": "TypeScript"
        }],
        shouldFetch: false
    }
}

describe('Projects component', () => {
    it('renders itself', () => {
        const proj = renderer.create(
            <Root iniStore={{} as any}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );
        const projInstance = proj.root;

        expect(projInstance.findByType(Segment)).toBeDefined();
        proj.unmount();
    });

    it('renders SearchContainer and SearchForm', () => {
        const proj = mount(
            <Root iniStore={{} as any}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );

        expect(proj.find(SearchContainer)).toHaveLength(1);
        expect(proj.find(SearchForm)).toHaveLength(1);
        proj.unmount();
    });

    it('has pending, failure & not found state', () => {
        const state = {
            session: {
                pending: true,
                ok: false,
                failure: false,
                message: ''
            },
            repos: {
                display: {},
                query: 'find something',
                repos: {
                    total_count: 100,
                    incomplete_results: false,
                    items: []
                },
                page: 1,
                shouldFetch: false
            }
        }

        const proj = mount(
            <Root iniStore={state}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );

        expect(proj.find(Message)).toHaveLength(1);
        proj.unmount();

        state.session.pending = false;
        state.session.ok = false;
        state.session.failure = true;
        state.session.message = '40x';

        const proj2 = mount(
            <Root iniStore={state}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );

        expect(proj2.find(Message)).toHaveLength(1);
        proj2.unmount();

        state.session.pending = false;
        state.session.ok = true;
        state.session.message = '';

        const proj3 = mount(
            <Root iniStore={state}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );

        expect(proj3.find(Card)).toHaveLength(0);
        expect(proj3.find(Message)).toHaveLength(0);
        proj3.unmount();
    });

    it('renders item from state', () => {
        const proj = mount(
            <Root iniStore={activeState}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );

        expect(proj.find(Card)).toHaveLength(1);
        proj.unmount();
    });

    it('matches snapshot', () => {
        const proj = renderer.create(
            <Root iniStore={activeState}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );

        expect(proj.toJSON()).toMatchSnapshot();
        proj.unmount();
    });
});
