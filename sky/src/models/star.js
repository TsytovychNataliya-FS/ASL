// star.js (model definition)
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    static associate(models) {
      // Star belongs to many Planets through the StarsPlanets join table
      Star.belongsToMany(models.Planet, {
        through: "StarsPlanets", // Join table
        foreignKey: "starId", // Foreign key for Star in the join table
        otherKey: "planetId", // Foreign key for Planet in the join table
        as: "planets", // Alias for this relationship
      });

      // Star belongs to a Galaxy
      Star.belongsTo(models.Galaxy, {
        foreignKey: "galaxyId", // Foreign key in Star pointing to Galaxy
        as: "galaxy", // Alias for the relationship
      });
    }
  }
  Star.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      galaxyId: DataTypes.INTEGER, // Foreign key to Galaxy
    },
    {
      sequelize,
      modelName: "Star",
    }
  );
  return Star;
};
