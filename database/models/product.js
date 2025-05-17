import { Model, Sequelize, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
    class Product extends Model { }
    Product.init(
        {   
            stitle: Types.STRING,
            sdescription: Types.STRING,
            created_at: Types.TEXT,
            updated_at: Types.TEXT,
        },
        {
            timestamps: false,
            sequelize,
            modelName: "Product",
            tableName: "tbl_product",
        }
    );
    return Product;
};

export default initDatabase(connection, DataTypes);
