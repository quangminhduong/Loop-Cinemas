const { buildSchema } = require("graphql");
const db = require("../database");

const movies = {};

movies.schema = buildSchema(`
  type Movie {
    id: Int
    title: String
    release_date: String
    runtime: Int
    director: String
    description: String
    poster: String
    visits: Int
  }
  type Query {
    all_movies : [Movie],
    movie(id: Int) : Movie
    movie_visits(id: Int): Int
    movie_title(id: Int): String
  } 
  type Mutation {
    create_movie(title: String, release_date: String, runtime: Int, director: String, description: String, poster: String) : Movie
    update_movie(id: Int, title: String, release_date: String, runtime: Int, director: String, description: String, poster: String) : Movie
    delete_movie(id: Int) : Boolean
  }
`);

movies.root = {
  // Queries
  all_movies: async () => {
    return await db.movie.findAll();
  },
  movie: async (args) => {
    return await db.movie.findByPk(args.id);
  },
  movie_title: async (args) => {
    const movie = await db.movie.findByPk(args.id);
    return movie ? movie.title : null;
  },
  movie_visits: async (args) => {
    const movie = await db.movie.findByPk(args.id);
    return movie.visits;
  },

  // Mutations
  create_movie: async (args) => {
    const movie = await db.movie.create({
      title: args.title,
      release_date: args.release_date,
      runtime: args.runtime,
      director: args.director,
      description: args.description,
      poster: args.poster,
      visits: 0,
    });
    return movie;
  },
  update_movie: async (args) => {
    const movie = await db.movie.findByPk(args.id);
    movie.title = args.title;
    movie.release_date = args.release_date;
    movie.runtime = args.runtime;
    movie.director = args.director;
    movie.description = args.description;
    movie.poster = args.poster;
    await movie.save();
    return movie;
  },
  delete_movie: async (args) => {
    const movie = await db.movie.findByPk(args.id);
    if (movie === null) return false;
    await movie.destroy();
    return true;
  },
};

module.exports = movies;
