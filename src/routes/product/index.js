import { Router } from "express";
import productController from "../../controller/product/index.js";
const productRouter = Router();

//get student by id
productRouter.get("/products/:id", productController.findOne);
// //get student by id
// productsRouter.get("/products/:id", productController.findBook);

//create student api
productRouter.post("/product", productController.create);

//update products details
productRouter.put("/products/:id", productController.update);

//delete student
productRouter.delete("/products/:id", productController.deleted);

export default productRouter;
