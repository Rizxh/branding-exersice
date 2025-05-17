import { Model, Sequelize, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
  class Label extends Model {}
  Label.init(
    {
      logo: Types.STRING,
      title: Types.STRING,
      description: Types.TEXT,
      created_at: Types.TEXT,
      updated_at: Types.TEXT,
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Label",
      tableName: "tbl_label",
    }
  );
  return Label;
};

export default initDatabase(connection, DataTypes);
