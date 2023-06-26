const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');
const db = require('./config/connection');

const server = new ApolloServer({ typeDefs, resolvers });

db.once('open', () => {
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
});








// // code before i setup graphql and apollo server
// const express = require('express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');

// const app = express();
// const PORT = process.env.PORT || 3001;
// const { ApolloServer } = require('apollo-server');
// const typeDefs = require('./schema');
// const resolvers = require('./resolvers');

// const server = new ApolloServer({ typeDefs, resolvers });

// // Start the server
// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
