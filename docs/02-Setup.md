## Setup

1. `cd path/to/project`
2. `yarn` to install common dependencies

### API
The API endpoint needed to post metrics
#### Stack
- NodeJS
- TypeScript
- Jest
- Eslint
- Webpack
- Swagger

1. `cd src/api`
2. `yarn` to install api dependencies
3. `yarn lint` to run static anaylsis tests
4. `yarn lint:fix` to fix static errors if possible
5. `yarn prettier` to unify formatting
6. `yarn test` to run tests
7. `yarn dry-run` to try to run code in case any errors can be discovered by this stage
8. `yarn build` to generate a production build (at path/to/project/dist/api)

#### Docs
To generate docs: Run `yarn doc` then open [API Docs](http://localhost:3000/api-docs).
![](https://drive.google.com/uc?id=1UtfAgdaVUk-DerwcLWWlt91lXRLmg4WQ)

### Client
The Frontend needed to insert metrics
#### Stack
- ReactJS
- TypeScript
- Jest
- Eslint
- Vite

1. `cd src/client`
2. `yarn` to install api dependencies
3. `yarn lint` to run static anaylsis tests
4. `yarn lint:fix` to fix static errors if possible
5. `yarn test` to run tests
6. `yarn dev` to start dev server
7. `yarn preview` to locally preview production build
8. `yarn build` to generate a production build (at path/to/project/dist/client)

For more info check: [Client README](./../src/client/README.md).

### Deployment
#### Stack
- Github Actions
- Bash scripting
- AWS Cloudformation
- Cypress

#### Commits
To commit code changes: Run `yarn gitmoji -c` at the root directory and it will start an interactive tool to commit changes with readable messages. 

## Future Enhancements
- Add live monitoring for client-side to catch front-end errors.
- Add authentication layer to secure communication.
- Split infrastructure for more independence between front-end and back-end.
- Optimize the balance between data reliability vs cost optimization through customizing read data prep mechanisms. 