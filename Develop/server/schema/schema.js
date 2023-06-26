const { gql } = require('apollo-server-express');

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
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    saveBook(bookData: BookInput!): Auth
    deleteBook(bookId: ID!): User
    # Add more mutations as needed
  }

  type Auth {
    token: ID!
    user: User
  }


  input BookInput {
    id: ID!
    title: String!
    author: String!
    # Add more fields as needed
  }
`;

module.exports = typeDefs;