import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
    class SubSectionSolution extends Model { }
    SubSectionSolution.init(
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
            logo: Types.STRING,
            title: Types.STRING,
            description: Types.TEXT,
            created_at: Types.TEXT,
            updated_at: Types.TEXT,
        },
        {
            timestamps: false,
            sequelize,
            modelName: "SubSectionSolution",
            tableName: "tbl_subsection_solution",
        }
    );

    SubSectionSolution.associate = (models) => {
        SubSectionSolution.belongsTo(models.Solution, {
            foreignKey: 'id_section', // Pastikan ini sesuai dengan kolom di Solution
            as: 'solution', // Alias yang digunakan saat meng-query
        });
    };

    return SubSectionSolution;
};

export default initDatabase(connection, DataTypes);