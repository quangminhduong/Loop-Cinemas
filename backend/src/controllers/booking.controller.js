const db = require("../database");

// Get a single booking by id
exports.one = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await db.booking.findByPk(id);

    if (booking) {
      res.status(200).json(booking);
    } else {
      res.status(400).json({ message: `No booking with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error. " + error });
  }
};

// Get all bookings for a user
exports.all_user = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await db.booking.findAll({ where: { user_id: userId } });

    const allBookings = [];
    // Get the session info for each booking
    for (const booking of bookings) {
      const session = await db.session.findByPk(booking.session_id);
      if (!session) throw new Error("No session found for the booking");
      allBookings.push({
        booking_id: booking.id,
        movie_id: booking.movie_id,
        num_tickets: booking.num_tickets,
        session_time: session.time,
      });
    }
    res.status(200).json(allBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error. " + error });
  }
};

// Get all bookings for a movie
exports.all_movie = async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const bookings = await db.booking.findAll({ where: { movie_id: movieId } });

    const allBookings = [];
    // Get the session info for each booking
    for (const booking of bookings) {
      const session = await db.session.findByPk(booking.session_id);
      if (!session) throw new Error("No session found for the booking");
      allBookings.push({
        booking_id: booking.id,
        movie_id: booking.movie_id,
        num_tickets: booking.num_tickets,
        session_time: session.time,
      });
    }
    res.status(200).json(allBookings);
  } catch (error) {
    console.error(error);
    res.status(500), json({ message: "Internal server error. " + error });
  }
};

// Add a new booking
exports.create = async (req, res) => {
  try {
    const booking = await db.booking.create({
      movie_id: req.body.movie_id,
      user_id: req.body.user_id,
      session_id: req.body.session_id,
      num_tickets: req.body.num_tickets,
    });

    if (booking) {
      // Update the required session to remove some available seats
      const session = await db.session.findByPk(req.body.session_id);

      if (session) {
        session.available_seats =
          session.available_seats - req.body.num_tickets;

        await session.save();

        return res.status(200).json(booking);
      } else {
        return res.status(400).json({
          message: `There was an error reserving tickets for session with id: ${req.body.session_id}`,
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: "The booking record could not be created" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error. " + error });
  }
};

// Modify a booking by id
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await db.booking.findByPk(id);

    if (booking) {
      booking.movie_id = req.body.movie_id;
      booking.user_id = req.body.user_id;
      booking.session_id = req.body.session_id;
      booking.num_tickets = req.body.num_tickets;

      await booking.save();

      return res.status(200).json(booking);
    } else {
      return res.status(400).json({ message: `No booking with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error. " + error });
  }
};

// Remove a booking by id
exports.remove = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await db.booking.findByPk(id);

    if (booking) {
      // Delete booking and add tickets back to session
      const session_id = booking.session_id;
      const num_tickets = booking.num_tickets;
      await booking.destroy();
      const session = await db.session.findByPk(session_id);
      if (session) {
        session.available_seats = session.available_seats + num_tickets;
        await session.save();
        return res
          .status(200)
          .json({ message: `Booking with id: ${id} was deleted` });
      }
    } else {
      return res.status(400).json({ message: `No booking with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error. " + error });
  }
};
