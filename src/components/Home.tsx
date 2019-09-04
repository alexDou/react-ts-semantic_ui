import React, { ReactElement } from 'react';
import {
    Segment, Container, Header, Grid, Image, Icon
} from 'semantic-ui-react';
import { style } from 'typestyle';

import SearchContainer from '@containers/search';

const styles = {
    homeSegment: style({
        $nest: {
            '&.ui.vertical.segment': {
                margin: '5em 0em 0em',
                padding: '5em 0em',
            },
        }
    }),
    homeContainer: style({
        marginTop: '2em',
    }),
    homeGrid: style({
        $nest: {
            '&.ui.grid': {
                maxWidth: 450,
                margin: '0 auto'
            }
        }
    })
};

const Home = (): ReactElement => {
    return (
        <Segment vertical className={styles.homeSegment}>
            <Container textAlign="center">
                <Header as="h1">
                    <Image src="assets/images/logo.png" />
                </Header>
                <Container text className={styles.homeContainer}>
                    <Grid textAlign="center" className={styles.homeGrid} verticalAlign="middle">
                        <Grid.Column>
                            <Header as="h2" color="black" textAlign="center">
                                <Icon name="github square" />
                                Github Repositories
                            </Header>
                            <SearchContainer
                                size="large"
                                color="black"
                                stacked={true}
                                disabled={false}
                                query=""
                            />
                        </Grid.Column>
                    </Grid>
                </Container>
            </Container>
        </Segment>
    );
}

export default Home;
