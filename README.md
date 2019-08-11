# Search for repositories via Github API

## Plan of work

_ configure project:_

- dependencies (react, reactdom, redux, react-router-dom, reselect, axios, webpack, ts-loader, typescript, semantic-ui-react) 
- include dev dependencies
- put together config files for: 
    - webpack, 
    - eslint, 
    - typescript, 
    - enzyme

_create basic project structure_

- html entry file
- redux store
- root component with router
- components
- containers
- api
- transport
- helpers

_check to see if everything compiles_

- add first test
- cover with tests app core (*src/\__tests\__*)
- make the basic tests pass
- create tests for components
    - home 
    - search, 
    - projects, 
    - pagination, 
    - status, 
    - report
- write components to comply to tests
    - try to consequentially advance in TDD manner
    
_finetune_

- run app in browser
- fix bugs if any
- make it better

## Install and run

```bash
    $ git clone https://github.com/alexDou/react-ts-semantic_ui.git
```

```bash
    $ yarn install
```

__Tests__

```bash
    $ yarn run test
```

All tests located in conventional \__tests\__ folders, and have
extensions that reads `spec.tsx`

Snapshot tests added

Libraries used:

- jest
- react-test-renderer
- enzyme
- *TBD. test async actions with moxios*


__Run__

```bash
    $ yarn start
```

Head to [http://localhost:8080](http://localhost:8080)

have some fun