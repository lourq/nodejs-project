import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const GameSessions = sequelize.define(
  "GameSessions",
  {
    SessionID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    StartTime: {
      type: DataTypes.DATE,
    },
    EndTime: {
      type: DataTypes.DATE,
    },
    ImpostorID: {
      type: DataTypes.INTEGER,
      references: { model: "players", key: "PlayerID" },
    },
  },
  { timestamps: false }
);

export default GameSessions;
