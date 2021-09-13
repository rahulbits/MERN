import express from "express"
import {
  CreateProduct,
  createProductReview,
  deleteProduct,
  getProducts,
  getProductsbyid,
  getTopRatedproducts,
  updateProduct,
} from "../Controllers/productControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(getProducts).post(protect, admin, CreateProduct)
router.get("/top", getTopRatedproducts)
router
  .route("/:id")
  .get(getProductsbyid)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

router.route("/:id/reviews").post(protect, createProductReview)

export default router
