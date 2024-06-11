import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4000/sessions";

// Get all sessions for a movie
const getAllMovieSessions = async (id) => {
  const query = gql`
    query ($id: Int) {
      movie_sessions(movie_id: $id) {
        id
        movie_id
        time
        available_seats
      }
    }
  `;
  const variables = { id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.movie_sessions;
};

export { getAllMovieSessions };
