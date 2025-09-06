import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import trainRoutes from "./routes/train.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request

app.use("/api/train", trainRoutes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
