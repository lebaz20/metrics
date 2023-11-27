## Installation

1. `cd path/to/project`
2. `yarn` to install common dependencies

### API
The API endpoint needed to post metrics

1. `cd src/api`
2. `yarn` to install api dependencies
3. `yarn lint` to run static anaylsis tests
4. `yarn lint:fix` to fix static errors if possible
5. `yarn prettier` to unify formatting
6. `yarn test` to run tests
7. `yarn build` to generate a bundle for all the needed code changes (at path/to/project/dist/api)
8. `yarn dry-run` to try to run code in case any errors can be discovered by this stage

#### Docs
To generate docs: Run `yarn doc` then open [API Docs](http://localhost:3000/api-docs).
![](https://drive.google.com/uc?id=1UtfAgdaVUk-DerwcLWWlt91lXRLmg4WQ)

### Client
The Frontend needed to insert metrics

### Commits
To commit code changes: Run `yarn gitmoji -c` and it will start an interactive tool to commit changes with readable messages. 