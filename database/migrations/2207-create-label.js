module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_label", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      logo: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("tbl_label");
  },
};
