import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const ChatLogs = sequelize.define(
  "ChatLogs",
  {
    ChatID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SessionID: {
      type: DataTypes.INTEGER,
      references: { model: "gamesessions", key: "SessionID" },
      allowNull: true,
    },
    Message: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    TimeStamp: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default ChatLogs;
