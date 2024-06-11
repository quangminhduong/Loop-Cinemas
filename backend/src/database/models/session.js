module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define("session", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    available_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  session.belongsTo(sequelize.models.movie, {
    foreignKey: "movie_id",
  });

  return session;
};
