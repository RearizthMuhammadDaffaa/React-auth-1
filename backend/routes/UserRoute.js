import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/Users.js";
import { verifyuser ,adminOnly} from "../middleware/Authuser.js";

const router = express.Router()

router.get('/users', verifyuser,adminOnly,getUsers);
router.get('/users/:id',verifyuser,adminOnly,getUserById);
router.post('/users', verifyuser, adminOnly,createUser);
router.patch('/users/:id',verifyuser, adminOnly,updateUser);
router.delete('/users/:id',verifyuser,adminOnly,deleteUser);


export default router;

