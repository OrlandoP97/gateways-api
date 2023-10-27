# Express MongoDB API

This is a REST service (JSON/HTTP) for storing information about gateways and their associated devices. The data is stored in a MongoDB database.

## Features

- Express.js for building the REST API
- MongoDB for storing data
- Jest for running unit tests
- Docker for containerization
- Separate environments for development and production
- .env file for configuration

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and Docker with docker-compose installed on your machine.

### Installing

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install the necessary dependencies.
3. Create a `.env` file in the root directory and add your environment variables.
4. For development, use `docker-compose -f dev-compose.yaml up` to start the database and mongo-express to visualize the database. To run the server in development mode, you also need to execute `npm run dev` in another terminal.
5. For production, use `docker-compose up` to start the production server.

## Environment Variables

The project requires the following environment variables to be set in a `.env` file:

```
DB_HOST=localhost
DB_USERNAME=admin
DB_PASSWORD=adminpassword
DB_NAME=gatewayDB
DB_PORT=27017
```

These variables are used to configure the connection to the MongoDB database.

## Running the tests

The project includes unit tests that run with Jest. You can run them using the `npm run test` command.

## Deployment

The project is dockerized and includes separate environments for development and production. To build the Docker image, run `docker build -t your-image-name .`. To run the Docker container, use the `docker run -p 5000:5000 -d your-image-name` command.

## Built With

- [Express.js](https://expressjs.com/) - The web framework used
- [MongoDB](https://www.mongodb.com/) - The database used
- [Docker](https://www.docker.com/) - For containerization
- [Jest](https://jestjs.io/) - For running unit tests

## Authors

- **Orlando Pantoja** - [YourName](https://github.com/OrlandoP97)
