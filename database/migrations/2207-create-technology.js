module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_technology", {
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
      created_at: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("tbl_technology");
  },
};
