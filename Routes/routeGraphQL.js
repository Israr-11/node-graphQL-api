// express: The Express.js web framework for building web applications.
// graphqlHTTP: Middleware for handling GraphQL requests with Express.
// buildSchema: A function from the graphql library to build a GraphQL schema.
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const userController = require("../Controllers/userController");

// Defines a GraphQL schema using the buildSchema function.
// Defines a User type with id, name, and email fields.
// Defines a Query type with a getUsers field that returns an array of User objects along with a
//single user return
// Defines a Mutation type with an addUser field for adding a new user, updating and deleting.

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User          #For getting a single user
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String!, email: String!): User
    deleteUser(id: ID!): User
  }
`);

// Defines resolver functions for the GraphQL operations (getUsers and addUser).
// The getUsers resolver calls the getUsers function from the userController.
// The addUser resolver calls the addUser function from the userController.
const root = {
  getUsers: () => userController.getUsers(),
  getUser: ({ id }) => userController.getUser(id),
  addUser: ({ name, email }) => userController.addUser(name, email),
  updateUser: ({ id, name, email }) =>
    userController.updateUser(id, name, email),
  deleteUser: ({ id }) => userController.deleteUser(id),
};

const router = express.Router();

// Configures the Express router to use the GraphQL middleware (graphqlHTTP).
// Provides the GraphQL schema (schema) and resolver functions (rootValue).
// Enables the GraphiQL interface for testing by setting graphiql to true.

router.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

module.exports = router;
