import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/Product.js"
import { verifyuser } from "../middleware/Authuser.js";

const router = express.Router()

router.get('/products',verifyuser,getProducts);
router.get('/products/:id',verifyuser ,getProductById);
router.post('/products' ,verifyuser,createProduct);
router.patch('/products/:id',verifyuser,updateProduct);
router.delete('/products/:id',verifyuser,deleteProduct);


export default router;

