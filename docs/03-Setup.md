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

1. `cd api`
2. `yarn` to install api dependencies
3. `yarn lint` to run static anaylsis tests
4. `yarn lint:fix` to fix static errors if possible
5. `yarn prettier` to unify formatting
6. `yarn test` to run tests
7. `yarn test:watch` to run tests with code changes
8. `yarn dry-run` to try to run code in case any errors can be discovered by this stage
9. `yarn build` to generate a production build (at path/to/project/dist/api)

#### Docs
To generate docs: Run `yarn doc` from root directory then open [API Docs](http://localhost:3000/api-docs).
![](https://drive.google.com/uc?id=1UtfAgdaVUk-DerwcLWWlt91lXRLmg4WQ)

![](https://drive.google.com/uc?id=1G_P9PCd7pj0CAZjCFBpOb2U3fS0w-Zou)
- Check [Postman Collection](https://www.postman.com/lebaz20/workspace/metrics/collection/1283527-0800a457-8f2b-4bda-8aa2-c91530923091?action=share&creator=1283527).

### Client
The Frontend needed to insert metrics
#### Stack
- ReactJS
- TypeScript
- Jest
- Eslint
- Vite

1. `cd client`
2. `yarn` to install api dependencies
3. `yarn lint` to run static anaylsis tests
4. `yarn lint:fix` to fix static errors if possible
5. `yarn prettier` to unify formatting
6. `yarn test` to run tests
7. `yarn test:watch` to run tests with code changes
8. `yarn dev` to start dev server
9. `yarn preview` to locally preview production build
10. `yarn build` to generate a production build (at path/to/project/dist/client)

For more info check: [Client README](./../src/client/README.md).

![](https://drive.google.com/uc?id=1mPzUe8-eJCg0tQ6z7MOxwdl1UG7DDPgg)

![](https://drive.google.com/uc?id=1YJYpq0ceTPsSt_lQXwUQnnHfdBOQ2PmK)

### Deployment
#### Stack
- Github Actions
- Bash scripting
- AWS Cloudformation
- Cypress

#### Commits
To commit code changes: Run `yarn gitmoji -c` at the root directory and it will start an interactive tool to commit changes with readable messages.

#### End-to-end tests
To run e2e tests: Run `yarn e2e` at the root directory.

![](https://drive.google.com/uc?id=1F8s32sozr_ggUoOWkeRUCAFBID6qpMjm)

## Future Enhancements
- Run E2E tests after deployment and rollback on failure.
- Add live monitoring for client-side to catch front-end errors.
- Dynamically pass API URL from AWS CloudFormation to Client Build.
- Add authentication layer to secure communication.
- Split infrastructure for more independence between front-end and back-end.
- Optimize the balance between data reliability vs cost optimization through customizing read data prep mechanisms. 