import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.js";

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Message cannot be empty",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "Messages",
  }
);

export default Message;