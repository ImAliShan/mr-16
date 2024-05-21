import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import saleProductModel from "./index.js";

const productModel = sequelize.define(
  "product",
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productRate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  // {}
);



export default productModel;
