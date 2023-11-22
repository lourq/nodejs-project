import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const GameSessions = sequelize.define(
  "GameSessions",
  {
    SessionID: {
      type: DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey: true,
    },
    User: {
      type : DataTypes.STRING,
      references : { model: "players" , key : "Username"}
    },
    ImpostorID: {
      type: DataTypes.INTEGER,
      references: { model: "players", key: "PlayerID" },
    },
  },
  { timestamps: false }
);

export default GameSessions;