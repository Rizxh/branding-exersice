import { Model, Sequelize, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
    class Bottom extends Model { }
    Bottom.init(
        {   
            stitle: Types.STRING,
            sdescription: Types.STRING,
            created_at: Types.TEXT,
            updated_at: Types.TEXT,
        },
        {
            timestamps: false,
            sequelize,
            modelName: "Bottom",
            tableName: "tbl_bottom",
        }
    );
    return Bottom;
};

export default initDatabase(connection, DataTypes);
