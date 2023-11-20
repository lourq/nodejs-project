import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const Tasks = sequelize.define(
  "Tasks",
  {
    TaskID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false }
);

export default Tasks;
