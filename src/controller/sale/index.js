import salesModel from "../../model/sale/index.js";
import productModel from "../../model/sale/product.js";
import saleProductModel from "../../model/sale/salesProduct.js";

const salesController = {
  getAll: async (req, res) => {
    try {
      const allSales = await salesModel.findAll({
        order: [["createdAt", "DESC"]],
        limit: 10,
      });
      res.json({
        allSales: { Sales: allSales },
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const sale = await salesModel.findByPk(id, {
        include: [
          {
            model: salesProduct,
            includes: [productModel],
          },
        ],
      });
      if (!sale) {
        res.status(404).json({ message: "No sale for this product" });
        return;
      }
      res.status(200).json({ data: sale });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },

  create: async (req, res) => {
    try {
      const newSale = req.body;

      const sale = new salesModel();

      sale.totalAmount = 1;

      await sale.save();

      const salesProduct = newSale.salesProduct.map((ele) => {
        return {
          ...ele,
          saleId: sale.id,
        };
      });

      await saleProductModel.bulkCreate(salesProduct);

      res.status(200).json({ message: "sale created", sale });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateSale = req.body;
      if (!updateSale || Object.keys(updateSale).length === 0) {
        res
          .status(400)
          .json({ message: "Bad request - Update data not provided" });
      }
      const existingSale = await saleProductModel.findOne({ where: { id } });
      if (!existingSale) {
        return res.status(404).json({ error: "No sale found with this ID" });
      }
      await saleProductModel.update(updateSale, { where: { id } });

      const saleProductModel = await saleProductModel.findOne({
        where: { id },
      });

      res.json(updateSale);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },

  deleted: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const existingSale = await salesModel.findOne({ where: { id } });
      if (!existingSale) {
        res.status(404).json({ message: "no sale found with this id" });
      }

      await salesModel.destroy({ where: { id } });

      res.status(200).json({ message: "Sale deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
export default salesController;
