// planet.js (model definition)
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    static associate(models) {
      // Planet belongs to many Stars through the StarsPlanets join table
      Planet.belongsToMany(models.Star, {
        through: "StarsPlanets", // Join table
        foreignKey: "planetId", // Foreign key for Planet in the join table
        otherKey: "starId", // Foreign key for Star in the join table
        as: "stars", // Alias for this relationship
      });
    }
  }
  Planet.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Planet",
    }
  );
  return Planet;
};
