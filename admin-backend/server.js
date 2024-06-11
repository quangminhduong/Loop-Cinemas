const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const db = require("./src/database");

const users = require("./src/schemas/user.js");
const movies = require("./src/schemas/movie.js");
const sessions = require("./src/schemas/session.js");
const reviews = require("./src/schemas/review.js");
const bookings = require("./src/schemas/booking.js");

// Database will be sync'ed in the background.
db.sync();

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  "/users",
  graphqlHTTP({
    schema: users.schema,
    rootValue: users.root,
    graphiql: true,
  })
);

app.use(
  "/movies",
  graphqlHTTP({
    schema: movies.schema,
    rootValue: movies.root,
    graphiql: true,
  })
);

app.use(
  "/sessions",
  graphqlHTTP({
    schema: sessions.schema,
    rootValue: sessions.root,
    graphiql: true,
  })
);

app.use(
  "/reviews",
  graphqlHTTP({
    schema: reviews.schema,
    rootValue: reviews.root,
    graphiql: true,
  })
);

app.use(
  "/bookings",
  graphqlHTTP({
    schema: bookings.schema,
    rootValue: bookings.root,
    graphiql: true,
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/");
