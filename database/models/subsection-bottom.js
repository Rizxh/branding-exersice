import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
    class SubSectionBottom extends Model { }
    SubSectionBottom.init(
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
            section: Types.STRING,
            button: Types.STRING,
            link: Types.TEXT,
            created_at: Types.TEXT,
            updated_at: Types.TEXT,
        },
        {
            timestamps: false,
            sequelize,
            modelName: "SubSectionBottom",
            tableName: "tbl_subsection_bottom",
        }
    );

    SubSectionBottom.associate = (models) => {
        SubSectionBottom.belongsTo(models.Bottom, {
            foreignKey: 'id_section', // Pastikan ini sesuai dengan kolom di Solution
            as: 'bottom', // Alias yang digunakan saat meng-query
        });
    };

    return SubSectionBottom;
};

export default initDatabase(connection, DataTypes);