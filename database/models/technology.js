import { Model, Sequelize, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
    class Technology extends Model { }
    Technology.init(
        {   
            stitle: Types.STRING,
            sdescription: Types.STRING,
            created_at: Types.TEXT,
            updated_at: Types.TEXT,
        },
        {
            timestamps: false,
            sequelize,
            modelName: "Technology",
            tableName: "tbl_technology",
        }
    );
    return Technology;
};

export default initDatabase(connection, DataTypes);
