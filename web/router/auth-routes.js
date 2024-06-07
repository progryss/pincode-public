import express from "express";
const router = express.Router();
import { pincode, user } from "../controllers/auth-controller.js";

router.get("/user", user);
router.get("/pincode", pincode);

export {router};