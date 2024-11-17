// starsPlanets.js (join table definition)
"use strict";
module.exports = (sequelize, DataTypes) => {
  const StarsPlanets = sequelize.define(
    "StarsPlanets", // Name of the join table
    {
      starId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Stars", // Reference to the Star model
          key: "id",
        },
      },
      planetId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Planets", // Reference to the Planet model
          key: "id",
        },
      },
    },
    {}
  );

  return StarsPlanets;
};
