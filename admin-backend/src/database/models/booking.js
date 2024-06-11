module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define("booking", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    num_tickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  booking.belongsTo(sequelize.models.movie, {
    foreignKey: "movie_id",
  });
  booking.belongsTo(sequelize.models.user, {
    foreignKey: "user_id",
  });
  booking.belongsTo(sequelize.models.session, {
    foreignKey: "session_id",
  });

  return booking;
};
