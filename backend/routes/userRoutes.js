import express from "express"
import {
  authUser,
  deleteUser,
  getUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserById,
  updateUser,
} from "../Controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/login", authUser)
router.route("/").post(registerUser).get(protect, admin, getUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
