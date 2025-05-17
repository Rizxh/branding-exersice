module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_subsection_product", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_section: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_product", // nama tabel referensi
          key: "id", // kolom yang direferensikan
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      asset: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      link: {
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
    await queryInterface.dropTable("tbl_subsection_product");
  },
};