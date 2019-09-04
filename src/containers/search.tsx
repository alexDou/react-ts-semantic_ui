import React, { Component, ReactElement } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { AppState, SearchProps, StoreAction } from '@t/app';
import * as actions from '@store/actions';
import SearchForm from '@components/SearchForm';

class SearchContainer extends Component<AppState & SearchProps & RouteComponentProps, Readonly<keyof AppState>> {
    private static defaultProps = {
        size: 'large',
        color: 'black',
        stacked: true,
        disabled: false,
    };

    onFormSubmit = (searchQ: string): void => {
        const { setSearchQuery, history } = this.props;

        setSearchQuery(searchQ);
        history.push('/projects');
    };

    render(): ReactElement {
        const { size, color, stacked, disabled, repos } = this.props;

        return (
            <SearchForm
                onFormSubmit={this.onFormSubmit}
                size={size}
                color={color}
                stacked={stacked}
                disabled={disabled}
                query={repos.query as string}
            />
        );
    }
}

const mapStateToProps = (state: AppState): Partial<AppState> => {
    return {
        session: { ...state.session },
        repos: { ...state.repos }
    }
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<AppState> => {
    return {
        setSearchQuery: (query: string): StoreAction => dispatch(actions.repos.setSearchQuery(query)),
        setPage: (page: number, shouldFetch: boolean): StoreAction => dispatch(actions.repos.setPage(page, shouldFetch)),
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(SearchContainer) as React.ComponentType<SearchProps>;
