import express from "express";
import {addTrains} from "../controllers/train.controller.js";

const router = express.Router();
router.post("/addtrains",addTrains);

export default router;