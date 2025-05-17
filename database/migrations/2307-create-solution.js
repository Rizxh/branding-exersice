module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_solution", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stitle: {
        type: Sequelize.STRING,
      },
      sdescription: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("tbl_solution");
  },
};
