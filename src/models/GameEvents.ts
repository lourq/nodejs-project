import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const GameEvents = sequelize.define(
  "GameEvents",
  {
    EventID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SessionID: {
      type: DataTypes.INTEGER,
      references: { model: "gamesessions", key: "SessionID" },
      allowNull: false,
    },
    EventType: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    EventTime: {
      type: DataTypes.DATE,
    },
    PlayerID: {
      type: DataTypes.INTEGER,
      references: { model: "players", key: "PlayerID" },
    },
  },
  {
    timestamps: false,
  }
);

export default GameEvents;
