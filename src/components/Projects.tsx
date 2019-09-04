import React, { Component, ReactElement } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
    Segment, Container, Grid, Responsive, Header, Divider, Icon, Card, Image, Message
} from 'semantic-ui-react';
import { style } from 'typestyle';

import { AppState, ProjectsProps, StoreAction } from '@t/app';
import * as actions from '@store/actions';
import SearchContainer from '@containers/search';
import StatusReport from '@components/StatusReport';
import Footer from '@components/Footer';

const cardStyle = style({
    $nest: {
        '&.ui.card, &.ui.cards>.card': {
            width: '98%',
        },
    }
});

const segmentStyle = style({
    $nest: {
        '&.ui.segment': {
            marginBottom: '120px'
        }
    }
});

class Projects extends Component<AppState & ProjectsProps & RouteComponentProps, Readonly<keyof AppState>> {

    componentDidMount(): void {
        const { session, repos, getSearch } = this.props;
        const query = repos.query || '';

        if (!session.pending && repos.shouldFetch) {
            getSearch(query, 1);
        }
    }

    // shouldComponentUpdate(
    //     nextProps: Readonly<AppState & RouteComponentProps>,
    //     nextState: Readonly<AppState>
    // ): boolean {
    //
    //     return (
    //         nextProps.repos.query !== this.props.repos.query
    //         || nextProps.repos.page !== this.props.repos.page
    //         || nextProps.repos.per_page !== this.props.repos.per_page
    //         || nextProps.session.ok !== this.props.session.ok
    //     );
    // }

    componentDidUpdate(): void {
        const { session, repos, getSearch } = this.props;

        const pageNum = repos.page || 1;
        const query = repos.query || '';

        // get data to display from REST API
        if (!session.pending && repos.shouldFetch && !repos.display[pageNum] && query) {
            getSearch(query, pageNum);
        }
    }

    displayItems(): ReactElement {
        const { session, repos } = this.props;

        const pageNum = repos.page || 1;
        const items = repos.display[pageNum] || [];
        const notFound = repos.repos.total_count === 0;

        return (session.ok ?
            <Segment color={items.length ? 'green' : 'grey'}>
                {notFound ? <Message color="red" content="No repos found by this query" /> : '' }
                <Responsive>
                    <Grid celled="internally" stackable columns={3}>
                        {items.map((it: any): ReactElement =>
                            <Grid.Column key={it.id}>
                                <Card centered className={cardStyle}>
                                    <Card.Content>
                                        <Image floated="right" size="mini" src={it.owner.avatar_url} />
                                        <Card.Header as="a" href={it.owner.html_url}>
                                            {it.full_name.length < 25
                                                ? it.full_name
                                                : `${it.full_name.substr(0, 25)}...`}
                                        </Card.Header>
                                        <Card.Meta>{it.language}</Card.Meta>
                                        <Card.Description>
                                            Owner: <strong>{it.owner.login}</strong>
                                        </Card.Description>
                                        <Card.Description>
                                            Stars: <strong>{it.stargazers_count}</strong>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        )}
                    </Grid>
                </Responsive>
            </Segment>
            : <></>
        )
    }

    handlePageChange = (page: number): void => {
        const { setPage } = this.props;

        setPage(page, true);
    };

    render(): ReactElement {
        const { session, repos } = this.props;

        const pageNum = repos.page || 1;

        return (
            <Segment className={segmentStyle}>
                <Divider horizontal>
                    <Header as="h4">
                        <Icon name="search" />
                        Search repositories
                    </Header>
                </Divider>
                <Responsive as={Container}>
                    <SearchContainer
                        size="small"
                        color="grey"
                        stacked={false}
                        disabled={false}
                        query={repos.query as string}
                    />
                </Responsive>

                <Divider horizontal>
                    <Header as="h4">
                        <Icon name="github square" />
                        Matching repositories
                    </Header>
                </Divider>
                <Responsive as={Container}>
                    {this.displayItems()}
                    <StatusReport { ...session } />
                </Responsive>
                <Footer
                    pages={repos!.repos!.total_count || 0}
                    active={pageNum}
                    pageChange={this.handlePageChange}
                    {...session}
                />
            </Segment>
        );
    }
}

const mapStateToProps = (state: AppState): AppState => state;

const mapDispatchToProps = (dispatch: Dispatch): Partial<AppState> => {
    return {
        getSearch: (query: string, page: number): StoreAction => dispatch(actions.repos.getSearch(query, page)),
        setPage: (page: number, shouldFetch: boolean): StoreAction => dispatch(actions.repos.setPage(page, shouldFetch)),
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Projects) as React.ComponentType;
