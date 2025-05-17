import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
    class SubSectionProduct extends Model { }
    SubSectionProduct.init(
        {   
            id_section: {
                type: Types.INTEGER,
                references: {
                    model: 'tbl_product', // Nama tabel referensi
                    key: 'id', // Kolom yang direferensikan
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            asset: Types.STRING,
            title: Types.STRING,
            link: Types.STRING,
            created_at: Types.TEXT,
            updated_at: Types.TEXT,
        },
        {
            timestamps: false,
            sequelize,
            modelName: "SubSectionProduct",
            tableName: "tbl_subsection_product",
        }
    );

    SubSectionProduct.associate = (models) => {
        SubSectionProduct.belongsTo(models.Product, {
            foreignKey: 'id_section', // Pastikan ini sesuai dengan kolom di Solution
            as: 'product', // Alias yang digunakan saat meng-query
        });
    };

    return SubSectionProduct;
};

export default initDatabase(connection, DataTypes);