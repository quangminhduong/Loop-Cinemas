import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4000/bookings";

// Get the total number of tickets per day
const getTotalTicketsPerDay = async (date) => {
  const query = gql`
    query ($date: String) {
      total_tickets_per_day(date: $date)
    }
  `;
  const variables = { date };
  const data = await request(GRAPH_QL_URL, query, variables);
  
  // Return 0 instead of null
  if (data.total_tickets_per_day===null)  
    return 0;

  return data.total_tickets_per_day;
};

// Get the total number of tickets per day for a specific movie
const getTotalTicketsPerDayPerMovie = async (date, movie_id) => {
  const query = gql`
    query ($date: String, $movie_id: Int) {
      total_tickets_per_day_per_movie(date: $date, movie_id: $movie_id)
    }
  `;
  const variables = { date, movie_id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.total_tickets_per_day_per_movie;
};

// Get the total number of tickets per day for a specific user
const getTotalTicketsPerDayPerUser = async (date, user_id) => {
  const query = gql`
    query ($date: String, $user_id: Int) {
      total_tickets_per_day_per_user(date: $date, user_id: $user_id)
    }
  `;
  const variables = { date, user_id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.total_tickets_per_day_per_user;
};

// Get the total number of tickets per day for a specific user and movie
const getTotalTicketsPerDayPerUserPerMovie = async (date, user_id, movie_id) => {
  const query = gql`
    query ($date: String, $user_id: Int, $movie_id: Int) {
      total_tickets_per_day_per_user_per_movie(date: $date, user_id: $user_id, movie_id: $movie_id)
    }
  `;
  const variables = { date, user_id, movie_id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.total_tickets_per_day_per_user_per_movie;
};

export {
  getTotalTicketsPerDay,
  getTotalTicketsPerDayPerMovie,
  getTotalTicketsPerDayPerUser,
  getTotalTicketsPerDayPerUserPerMovie
};