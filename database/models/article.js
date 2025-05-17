import { Model, Sequelize, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
    class Article extends Model { }
    Article.init(
        {   
            stitle: Types.STRING,
            sdescription: Types.STRING,
            created_at: Types.TEXT,
            updated_at: Types.TEXT,
        },
        {
            timestamps: false,
            sequelize,
            modelName: "Article",
            tableName: "tbl_article",
        }
    );
    return Article;
};

export default initDatabase(connection, DataTypes);
