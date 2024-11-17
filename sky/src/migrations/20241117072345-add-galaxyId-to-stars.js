module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Stars", "galaxyId", {
      type: Sequelize.INTEGER, // Matching the type in the model definition
      allowNull: true, // Change to false if you want it to be non-nullable
      references: {
        model: "Galaxies", // Refers to the table name of Galaxies
        key: "id", // Refers to the primary key column in the Galaxies table
      },
      onUpdate: "CASCADE", // Automatically update galaxyId if the referenced id in Galaxies changes
      onDelete: "SET NULL", // Set galaxyId to NULL if the corresponding Galaxy is deleted
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Stars", "galaxyId"); // Remove galaxyId column in case of rollback
  },
};
