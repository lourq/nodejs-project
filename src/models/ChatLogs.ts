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
      allowNull: false,
    },
    PlayerID: {
      type: DataTypes.INTEGER,
      references: { model: "players", key: "PlayerID" },
      allowNull: false,
    },
    Message: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    TimeStamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
    indexes: [
      {
        name: "idx_sessionid",
        fields: ["SessionID"],
      },
      {
        name: "idx_playerid",
        fields: ["PlayerID"],
      },
    ],
  }
);

export default ChatLogs;
