import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SalesModel from "./index.js";
import productModel from "./product.js";

const saleProductModel = sequelize.define(
  "saleProduct",
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productRate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }
  // {}
);

productModel.hasMany(saleProductModel);
saleProductModel.belongsTo(productModel);

SalesModel.hasMany(saleProductModel);
saleProductModel.belongsTo(SalesModel);

export default saleProductModel;
