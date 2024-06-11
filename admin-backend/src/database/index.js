const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.movie = require("./models/movie.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.session = require("./models/session.js")(db.sequelize, DataTypes);
db.booking = require("./models/booking.js")(db.sequelize, DataTypes);

// SESSION
db.session.belongsTo(db.movie, {
  foreignKey: "movie_id",
});
db.movie.hasMany(db.session);

// REVIEW
db.review.belongsTo(db.movie, {
  foreignKey: "movie_id",
});
db.review.belongsTo(db.user, {
  foreignKey: "user_id",
});
db.movie.hasMany(db.review);
db.user.hasMany(db.review);

// BOOKING
db.booking.belongsTo(db.movie, {
  foreignKey: "movie_id",
});
db.booking.belongsTo(db.user, {
  foreignKey: "user_id",
});
db.booking.belongsTo(db.session, {
  foreignKey: "session_id",
});
db.movie.hasMany(db.booking);
db.user.hasMany(db.booking);
db.session.hasMany(db.booking);

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });

  await seedData();
};

// Seed all data via each seed function
async function seedData() {
  await SeedUsers(db);
  await SeedMovies(db);
  await SeedReviews(db);
  await SeedSessions(db);
  await SeedBookings(db);
}

async function SeedUsers(db) {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0) return;

  await db.user.create({
    username: "chris-santamaria",
    email: "chrismsanta@gmail.com",
    password:
      "42a9798b99d4afcec9995e47a1d246b98ebc96be7a732323eee39d924006ee1d",
    type: "user",
    enabled: true,
  });
  await db.user.create({
    username: "chrismsanta",
    email: "s3718165@student.rmit.edu.au",
    password:
      "42a9798b99d4afcec9995e47a1d246b98ebc96be7a732323eee39d924006ee1d",
    type: "user",
    enabled: true,
  });
  await db.user.create({
    username: "admin",
    email: "admin@test.com",
    password:
      "42a9798b99d4afcec9995e47a1d246b98ebc96be7a732323eee39d924006ee1d",
    type: "admin",
    enabled: true,
  });
}

async function SeedMovies(db) {
  const count = await db.movie.count();

  // Only seed data if needed
  if (count > 0) return;

  await db.movie.create({
    title: "Meg 2: The Trench",
    release_date: new Date("August 3, 2023"),
    runtime: 116,
    director: "Ben Wheatley",
    description:
      "Jonas Taylor leads a research team on an exploratory dive into the deepest depths of the ocean. Their voyage spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival. Pitted against colossal, prehistoric sharks and relentless environmental plunderers, they must outrun, outsmart and outswim their merciless predators.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZjYyYzYzMDktNzQxMC00NGM0LTljYjYtZjUyYzZkNjZlYzAwXkEyXkFqcGdeQXVyMTI0NDgxMjQ0._V1_.jpg",
    visits: 0,
  });
  await db.movie.create({
    title: "Oppenheimer",
    release_date: new Date("July 20, 2023"),
    runtime: 180,
    director: "Christopher Nolan",
    description:
      "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
    poster:
      "https://assets-prd.ignimgs.com/2022/07/21/oppenheimer-poster-1658411601593.jpeg",
    visits: 0,
  });
  await db.movie.create({
    title: "Barbie",
    release_date: new Date("July 20, 2023"),
    runtime: 114,
    director: "Greta Gerwig",
    description:
      "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    poster:
      "https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    visits: 0,
  });
}

async function SeedSessions(db) {
  const count = await db.session.count();

  if (count > 0) return;

  // MEG 2
  await db.session.create({
    movie_id: 1,
    time: new Date(2023, 7, 27, 12, 30),
    available_seats: 6,
  });
  await db.session.create({
    movie_id: 1,
    time: new Date(2023, 7, 27, 14, 30),
    available_seats: 10,
  });
  await db.session.create({
    movie_id: 1,
    time: new Date(2023, 7, 27, 16, 30),
    available_seats: 10,
  });

  // OPPENHEIMER
  await db.session.create({
    movie_id: 2,
    time: new Date(2023, 7, 27, 12, 30),
    available_seats: 10,
  });
  await db.session.create({
    movie_id: 2,
    time: new Date(2023, 7, 27, 14, 30),
    available_seats: 7,
  });
  await db.session.create({
    movie_id: 2,
    time: new Date(2023, 7, 27, 16, 30),
    available_seats: 10,
  });

  // BARBIE
  await db.session.create({
    movie_id: 3,
    time: new Date(2023, 7, 27, 12, 30),
    available_seats: 10,
  });
  await db.session.create({
    movie_id: 3,
    time: new Date(2023, 7, 27, 14, 30),
    available_seats: 10,
  });
  await db.session.create({
    movie_id: 3,
    time: new Date(2023, 7, 27, 16, 30),
    available_seats: 5,
  });
}

async function SeedReviews(db) {
  const count = await db.review.count();

  if (count > 0) return;

  // MEG 2
  await db.review.create({
    movie_id: 1,
    user_id: 1,
    username: "chris-santamaria",
    rating: 5,
    message:
      "I've always loved the ocean and stories of monsters lurking in the deep. This movie ticks all my boxes for amazing CGI, funny cast and script and crazy actions scenes that seem totally unbelievable. A must watch for any ocean enthusiast!",
    hidden: false,
  });
  await db.review.create({
    movie_id: 1,
    user_id: 2,
    username: "chrismsanta",
    rating: 3,
    message:
      "The ocean already terrified me and this really solidified that fear for me. There was some funny moments and I was always on the edge of my chair. A good movie but maybe don't take your children",
    hidden: false,
  });

  // OPPENHEIMER
  await db.review.create({
    movie_id: 2,
    user_id: 1,
    username: "chris-santamaria",
    rating: 5,
    message:
      "his movie was incredibly moving and had a very powerful message. The soundtrack could bring you to tears at some points and the performances from the entire cast was very moving. Really gets you thinking about just how far we have come as a species.",
    hidden: false,
  });
  await db.review.create({
    movie_id: 2,
    user_id: 2,
    username: "chrismsanta",
    rating: 4,
    message: "Bomb go boom. It look good",
    hidden: false,
  });

  // BARBIE
  await db.review.create({
    movie_id: 3,
    user_id: 1,
    username: "chris-santamaria",
    rating: 2,
    message:
      "The movie was fun I guess and the cast was good but like they totally made a movie about the wrong type of doll. Can't give it a better score thanks to that.",
    hidden: false,
  });
  await db.review.create({
    movie_id: 3,
    user_id: 2,
    username: "chrismsanta",
    rating: 5,
    message:
      "Loved the theme and message of this movie. It was very powerful and had some hilarious moments! Definitely something worth going to see.",
    hidden: false,
  });
}

async function SeedBookings(db) {
  const count = await db.booking.count();

  if (count > 0) return;

  await db.booking.create({
    movie_id: 1,
    user_id: 1,
    session_id: 1,
    num_tickets: 4,
  });
  await db.booking.create({
    movie_id: 2,
    user_id: 2,
    session_id: 5,
    num_tickets: 3,
  });
  await db.booking.create({
    movie_id: 3,
    user_id: 1,
    session_id: 9,
    num_tickets: 5,
  });
}

module.exports = db;
