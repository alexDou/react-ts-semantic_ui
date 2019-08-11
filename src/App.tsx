import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import Root from './containers/Root';
import Home from './components/Home';
import Projects from './components/Projects';

const App = () => {
    return (
        <Root iniStore={{} as any}>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/projects" exact component={Projects} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </Root>
    );
};

export default App;
