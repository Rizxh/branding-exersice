import { Model, Sequelize, DataTypes } from "sequelize";
import connection from "../connection";

const initDatabase = (sequelize, Types) => {
    class VideoPage extends Model { }
    VideoPage.init(
        {   
            asset: Types.STRING,
            title: Types.STRING,
            description: Types.TEXT,
            button: Types.STRING,
            link: Types.STRING,
            created_at: Types.TEXT,
            updated_at: Types.TEXT,
        },
        {
            timestamps: false,
            sequelize,
            modelName: "VideoPage",
            tableName: "tbl_video",
        }
    );
    return VideoPage;
};

export default initDatabase(connection, DataTypes);
