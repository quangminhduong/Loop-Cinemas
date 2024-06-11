const { buildSchema } = require("graphql");
const db = require("../database");

const bookings = {};
const { Op } = require('sequelize');

bookings.schema = buildSchema(`
  type Booking {
    id: ID
    movie_id: Int
    user_id: Int
    num_tickets: Int
    createdAt: String
  }
  type Query {
    total_tickets_per_day(date: String): Int
    total_tickets_per_day_per_movie(date: String, movie_id: Int): Int
    total_tickets_per_day_per_user(date: String, user_id: Int): Int
    total_tickets_per_day_per_user_per_movie(date: String, user_id: Int, movie_id: Int): Int
  }
`);

bookings.root = {

    // Query
    total_tickets_per_day: async (args) => {
        // Get number of tickets made per day
        const date = args.date; 
         // Adjust for time zone offset
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        const result = await db.booking.sum('num_tickets', {
            where: {
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay], // Use Op.between to match the entire day
                },
            },
        });
        return result;
    },
     
    // Get number of tickets made per day for a movie
    total_tickets_per_day_per_movie: async (args) => {
        const date = args.date;
        const movieId = args.movie_id;
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);
        const result = await db.booking.sum('num_tickets', {
          where: {
            createdAt: {
              [Op.between]: [startOfDay, endOfDay],
            },
            movie_id: movieId,
          },
        });
        return result;
      },
    
      // Get number of tickets made per day by a user
      total_tickets_per_day_per_user: async (args) => {
        const date = args.date;
        const userId = args.user_id;
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);
        const result = await db.booking.sum('num_tickets', {
          where: {
            createdAt: {
              [Op.between]: [startOfDay, endOfDay],
            },
            user_id: userId,
          },
        });
        return result;
      },
      
      // Get number of tickets made per day by a user for a movie
      total_tickets_per_day_per_user_per_movie: async (args) => {
        const date = args.date;
        const userId = args.user_id;
        const movieId = args.movie_id;
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);
        const result = await db.booking.sum('num_tickets', {
          where: {
            createdAt: {
              [Op.between]: [startOfDay, endOfDay],
            },
            user_id: userId,
            movie_id: movieId,
          },
        });
        return result;
      },
};

module.exports = bookings;