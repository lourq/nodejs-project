import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const Players = sequelize.define(
  "Players",
  {
    PlayerID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    IP : {
      type: DataTypes.STRING(15),
      allowNull : false
    },
    Settings: {
      type: DataTypes.JSON,
    },
  },
  {
    timestamps: false,
  }
);

export default Players;
