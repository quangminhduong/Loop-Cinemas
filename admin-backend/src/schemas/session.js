const { buildSchema } = require("graphql");
const db = require("../database");

const sessions = {};

sessions.schema = buildSchema(`
  type Session {
    id: Int
    movie_id: Int
    time: String
    available_seats: Int
  }
  type Query {
    all_sessions : [Session],
    movie_sessions(movie_id: Int) : [Session]
  }
  type Mutation {
    create_session(movie_id: Int, time: String, available_seats: Int) : Session
    delete_session(id: Int) : Boolean
  }
`);

sessions.root = {
  // Queries
  all_sessions: async () => {
    return await db.session.findAll();
  },
  movie_sessions: async (args) => {
    return await db.session.findAll({ where: { movie_id: args.movie_id } });
  },

  // Mutations
  create_session: async (args) => {
    const session = await db.session.create({
      movie_id: args.movie_id,
      time: args.time,
      available_seats: args.available_seats,
    });
    return session;
  },
  delete_session: async (args) => {
    const session = await db.session.findByPk(args.id);
    if (session === null) return false;
    await session.destroy();
    return true;
  },
};

module.exports = sessions;
