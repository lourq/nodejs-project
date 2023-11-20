import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const GameSettings = sequelize.define(
  "GameSettings",
  {
    SettingID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SessionID: {
      type: DataTypes.INTEGER,
      references: { model: "gamesessions", key: "SessionID" },
    },
    Settings: {
      type: DataTypes.JSON,
    },
  },
  {
    timestamps: false,
  }
);

export default GameSettings;
