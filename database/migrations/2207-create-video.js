module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_video", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      asset: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      button: {
        type: Sequelize.STRING,
      },
      link: {
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
    await queryInterface.dropTable("tbl_video");
  },
};
