import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
    class SubSectionArticle extends Model { }
    SubSectionArticle.init(
        {   
            id_section: {
                type: Types.INTEGER,
                references: {
                    model: 'tbl_article', // Nama tabel referensi
                    key: 'id', // Kolom yang direferensikan
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            asset: Types.STRING,
            title: Types.STRING,
            link: Types.STRING,
            excerpts: Types.STRING,
            created_at: Types.TEXT,
            updated_at: Types.TEXT,
        },
        {
            timestamps: false,
            sequelize,
            modelName: "SubSectionArticle",
            tableName: "tbl_subsection_article",
        }
    );

    SubSectionArticle.associate = (models) => {
        SubSectionArticle.belongsTo(models.Article, {
            foreignKey: 'id_section', // Pastikan ini sesuai dengan kolom di Solution
            as: 'article', // Alias yang digunakan saat meng-query
        });
    };

    return SubSectionArticle;
};

export default initDatabase(connection, DataTypes);