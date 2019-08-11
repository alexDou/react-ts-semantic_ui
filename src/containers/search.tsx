import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { AppState, SearchProps, ThunkActionCreate } from '@t/app';
import * as actions from '@store/actions';
import SearchForm from '@components/SearchForm';

class SearchContainer extends Component<AppState & SearchProps & RouteComponentProps, AppState> {
    private static defaultProps = {
        size: 'large',
        color: 'black',
        stacked: true,
        disabled: false,
    };

    onFormSubmit = (searchQ: string) => {
        const { setSearchQuery } = this.props;

        setSearchQuery(searchQ);

        this.props.history.push('/projects');
    };

    render() {
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

const mapStateToProps = (state: AppState) => {
    return {
        session: { ...state.session },
        repos: { ...state.repos }
    }
};

const mapDispatchToProps = (dispatch: ThunkActionCreate) => {
    return {
        setSearchQuery: (query: string) => dispatch(actions.repos.setSearchQuery(query)),
        setPage: (page: number, shouldFetch: boolean) => dispatch(actions.repos.setPage(page, shouldFetch)),
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(SearchContainer) as React.ComponentType<SearchProps>;
