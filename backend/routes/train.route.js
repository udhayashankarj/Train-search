import express from "express";
import {addTrains,searchTrains} from "../controllers/train.controller.js";

const router = express.Router();
router.post("/addtrains",addTrains);
router.get("/search",searchTrains);

export default router;