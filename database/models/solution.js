import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
    class Solution extends Model { }
    Solution.init(
        {   
            stitle: Types.STRING,
            sdescription: Types.STRING,
        },
        {
            timestamps: false,
            sequelize,
            modelName: "Solution",
            tableName: "tbl_solution",
        }
    );

    Solution.associate = (models) => {
        Solution.hasMany(models.SubSectionSolution, {
            foreignKey: 'id_section',
            as: 'subSections',
        });
    };

    return Solution;
};

export default initDatabase(connection, DataTypes);