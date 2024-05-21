import productModel from "../../model/sale/product.js";
import saleProductModel from "../../model/sale/salesProduct.js";

const productController = {
  getAll: async (req, res) => {
    try {
      const allProduct = await productModel.findAll({
        order: [["createdAt", "DESC"]],
        limit: 10,
      });
      res.json({
        allProduct: { products: allProduct },
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error " });
    }
  },
  

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productModel.findByPk(id, {
        include: [productModel],
      });
      if (!product) {
        res.status(404).json({ message: "did'nt find this product" });
        return;
      }
      res.status(200).json({ data: product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },

  create: async (req, res) => {
    try {
      const newProduct = req.body;
      const addProduct1 = new productModel();
      addProduct1.totalAmout = 1;
      await addProduct1.save();
      //doubt
      const product = newProduct.saleProductModel.map((ele) => {
        return {
          ...ele,
          productId: product.id,
        };
      });
      // doubt
      await saleProductModel.bulkCreate(product);
      res.status(200).json({ message: "product created", product });
    } catch (error) {
      console.log(error);
      res.json(500).json({ message: "internal server error", error });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateProduct = req.body;
      if (!updateProduct || Object.keys(updateProduct).length === 0) {
        res
          .status(400)
          .json({ message: "Bad request - update data not provided" });
      }
      // doubt
      const existingProduct = await productModel.findOne({ where: { id } });
      if (!existingProduct) {
        return res
          .status(404)
          .json({ error: "there is not any product with that given id" });
      }
      //doubt productModel??
      await productModel.update(updateProduct, { where: { id } });

      res.json(updateProduct);
    } catch (error) {
      console.log(error);
      res.ststus(500).json({ message: "internal server error", error });
    }
  },

  deleted: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      //productMOdel
      const existingProduct = await productModel.findOne({ where: { id } });
      if (!existingProduct) {
        res.status(404).json({ message: "didn't find this product " });
      }
      //productModel
      await productModel.destroy({ where: { id } });
      res.status(200).json({ message: "product deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
};

export default productController;
