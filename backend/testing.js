import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import Train from "./models/train.model.js";
dotenv.config();


// ✅ FIXED: Processes trains sequentially to avoid memory crash
const searchTrains = async (req,res) => {
  const {sourcePoint,destinationPoint} = req.body;
  console.log(sourcePoint,destinationPoint);
  res.json({sourcePoint,destinationPoint});
  // console.log("✅ Completed adding all trains.");
};

const runSeeder = async () => {
  await connectDB();
  // await addTrains(1000); // Start with a smaller number like 100 to test
  // Once confirmed it works, you can increase it to 1000
  process.exit(0); // Exit the script when done
};

runSeeder();
