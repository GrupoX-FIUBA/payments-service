[![codecov](https://codecov.io/gh/GrupoX-FIUBA/payments-service/branch/main/graph/badge.svg?token=O42JMBRSZ2)](https://codecov.io/gh/GrupoX-FIUBA/payments-service)

# Payments Service

This microservice manages the transactions and payments related topics.

## Installation

To install the project we recommend that you use NVM and install the node version defined in `.nvmrc`

Once you have that in place, you can install the dependencies with npm through

`npm i`

### Start process

To start the process, after you installed the dependencies and deployed the smart contracts to kovan, you can run

`npm run start`

keep in mind that you should have everything in config set before that.

### With Docker

Run `docker-compose up` to start the app. Also, you can specify the port with the environment variable: `PORT=xxxx docker-compose up`.

#### Testing

To run the tests, after you installed the dependencies, just run

`npm test`

#### Linting

To run the linter, after you installed the dependencies, just run

`npm run lint`

#### Deployment

To deploy the smart contracts just run

`npm run deploy-kovan`

`npm run deploy-local`

depending on the network you want to use.

Keep in mind that you have to set the INFURA_API_KEY and MNEMONIC env vars (the .env file can be used for this).

To get the deployed contract address just look in the `deployments/<network>/BasicPayments.json` file.

#### More scripts

Other useful scripts can be found using

`npm run`

#### Docs

The documentation is generated automatically by Fastify (with Swagger). It's available in the server at `/docs`.
