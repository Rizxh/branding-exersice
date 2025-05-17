import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
    class SubSectionTechnology extends Model { }
    SubSectionTechnology.init(
        {   
            id_section: {
                type: Types.INTEGER,
                references: {
                    model: 'tbl_solution', // Nama tabel referensi
                    key: 'id', // Kolom yang direferensikan
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            asset: Types.STRING,
            description: Types.STRING,
            link: Types.STRING,
            created_at: Types.TEXT,
            updated_at: Types.TEXT,
        },
        {
            timestamps: false,
            sequelize,
            modelName: "SubSectionTechnology",
            tableName: "tbl_subsection_technology",
        }
    );

    SubSectionTechnology.associate = (models) => {
        SubSectionTechnology.belongsTo(models.Technology, {
            foreignKey: 'id_section', // Pastikan ini sesuai dengan kolom di Solution
            as: 'technology', // Alias yang digunakan saat meng-query
        });
    };

    return SubSectionTechnology;
};

export default initDatabase(connection, DataTypes);