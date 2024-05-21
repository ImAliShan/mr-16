import { Router } from "express";
import saleController from "../../controller/sale/index.js";

const salesRouter = Router();

//get all sales
salesRouter.get("/sales", saleController.getAll);

//get student by id
salesRouter.get("/sales/:id", saleController.findOne);
// //get student by id
// salesRouter.get("/sales/:id", saleController.findBook);

//create student api
salesRouter.post("/sales", saleController.create);

//update sales details
salesRouter.put("/sales/:id", saleController.update);

//delete student
salesRouter.delete("/sales/:id", saleController.deleted);

export default salesRouter;
