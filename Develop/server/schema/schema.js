const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    # Add more fields as needed
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    # Add more fields as needed
  }

  type Query {
    getUser(id: ID!): User
    getSingleUser(id: ID!): User
    # Add more queries as needed
  }

  type Mutation {
    createUser(username: String!, email: String!): User
    login(username: String!, password: String!): String
    saveBook(bookData: BookInput!): User
    deleteBook(bookId: ID!): User   # Add this line
    # Add more mutations as needed
  }

  input BookInput {
    id: ID!
    title: String!
    author: String!
    # Add more fields as needed
  }
`;

module.exports = typeDefs;
