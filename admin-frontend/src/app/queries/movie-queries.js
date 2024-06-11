import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4000/movies";

// Get all movies
const getAllMovies = async () => {
  const query = gql`
    {
      all_movies {
        id
        title
        release_date
        runtime
        director
        description
        poster
        visits
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);
  return data.all_movies;
};

// Update a movie by id
const updateMovie = async (
  id,
  title,
  release_date,
  runtime,
  director,
  description,
  poster
) => {
  const query = gql`
    mutation (
      $id: Int
      $title: String
      $release_date: String
      $runtime: Int
      $director: String
      $description: String
      $poster: String
    ) {
      update_movie(
        id: $id
        title: $title
        release_date: $release_date
        runtime: $runtime
        director: $director
        description: $description
        poster: $poster
      ) {
        id
      }
    }
  `;
  const variables = {
    id,
    title,
    release_date,
    runtime,
    director,
    description,
    poster,
  };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.update_movie;
};

// Create a new movie record
const createMovie = async (
  title,
  release_date,
  runtime,
  director,
  description,
  poster
) => {
  const query = gql`
    mutation (
      $title: String
      $release_date: String
      $runtime: Int
      $director: String
      $description: String
      $poster: String
    ) {
      create_movie(
        title: $title
        release_date: $release_date
        runtime: $runtime
        director: $director
        description: $description
        poster: $poster
      ) {
        id
      }
    }
  `;
  const variables = {
    title,
    release_date,
    runtime,
    director,
    description,
    poster,
  };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.create_movie;
};

// Get the number of visits for a specific movie
const getMovieVisits = async (id) => {
  const query = gql`
    query ($id: Int) {
      movie_visits(id: $id)
    }
  `;
  const variables = { id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.movie_visits;
};

// Get movie title by ID
const getMovieTitle = async (id) => {
  const query = gql`
    query ($id: Int) {
      movie_title(id: $id)
    }
  `;
  const variables = { id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.title;
};

export { getAllMovies, updateMovie, createMovie, getMovieVisits, getMovieTitle };
