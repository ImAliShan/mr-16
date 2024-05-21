import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const salesModel = sequelize.define(
  "sales",
  {
    totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

export default salesModel;
