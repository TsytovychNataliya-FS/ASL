// galaxy.js (model definition)
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    static associate(models) {
      // Galaxy has many Stars
      Galaxy.hasMany(models.Star, {
        foreignKey: "galaxyId", // Foreign key in Star pointing to Galaxy
        as: "stars", // Alias for this relationship
      });
    }
  }
  Galaxy.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Galaxy",
    }
  );
  return Galaxy;
};
