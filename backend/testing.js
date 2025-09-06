import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import Train from "./models/train.model.js";
dotenv.config();

const stopNames = [
  "New Delhi",
  "Mumbai Central",
  "Howrah Junction",
  "Chennai Central",
  "Bengaluru City",
  "Kolkata Sealdah",
  "Pune Junction",
  "Hyderabad Deccan",
  "Ahmedabad Junction",
  "Jaipur Junction",
  "Lucknow Charbagh",
  "Patna Junction",
  "Bhopal Junction",
  "Nagpur Junction",
  "Kanpur Central",
  "Varanasi Junction",
  "Agra Cantt",
  "Secunderabad Junction",
  "Thiruvananthapuram Central",
  "Ernakulam Junction",
  "Visakhapatnam",
  "Bhubaneswar",
  "Guwahati",
  "Amritsar Junction",
  "Chandigarh",
  "Jodhpur Junction",
  "Udaipur City",
  "Indore Junction",
  "Jabalpur",
  "Raipur Junction",
  "Ranchi Junction",
  "Dhanbad Junction",
  "Gaya Junction",
  "Prayagraj Junction",
  "Gorakhpur Junction",
  "Dehradun",
  "Haridwar",
  "Mathura Junction",
  "Gwalior Junction",
  "Jhansi Junction",
  "Itarsi Junction",
  "Vijayawada Junction",
  "Madurai Junction",
  "Coimbatore Junction",
  "Mangaluru Central",
  "Vasco da Gama",
  "Yesvantpur Junction",
  "Hazrat Nizamuddin",
  "Anand Vihar Terminal",
  "Lokmanya Tilak Terminus",
];

const generateRandomString = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateRandomDistance = () => {
  return Math.floor(Math.random() * 250) + 50; // Min distance 50
};

// ✅ FIXED: No longer mutates the original date
const generateRandomTime = (prevTime) => {
  // 1. Create a safe copy first
  const newTime = new Date(prevTime);
  // 2. Modify the copy
  newTime.setMinutes(
    newTime.getMinutes() + (Math.floor(Math.random() * 8) + 3) * 15
  );
  // 3. Return the modified copy
  return newTime;
};

const generateRandomStop = () => {
  return stopNames[Math.floor(Math.random() * stopNames.length)];
};

// ✅ FIXED: Made the function async to handle database checks
const generateRandomTrain = async () => {
  const noOfStops = Math.floor(Math.random() * 4) + 3;
  let time = new Date("2025-09-07T00:00:00.000Z");
  const stops = [];
  const usedStopNames = new Set();

  for (let i = 0; i < noOfStops; i++) {
    time = generateRandomTime(time);
    let stopName = generateRandomStop();
    while (usedStopNames.has(stopName)) {
      stopName = generateRandomStop();
    }
    usedStopNames.add(stopName);
    const stop = {
      name: stopName,
      distanceFromPreviousStop: i === 0 ? 0 : generateRandomDistance(),
      depatureTime: new Date(time),
    };
    stops.push(stop);
  }

  // ✅ FIXED: Correctly checks for a unique train name
  let trainName;
  let isUnique = false;
  do {
    trainName = "Train " + generateRandomString();
    // Use findOne which is more efficient for checking existence
    const existingTrain = await Train.findOne({ name: trainName });
    if (!existingTrain) {
      isUnique = true;
    }
  } while (!isUnique);

  const train = {
    name: trainName,
    stops: stops,
  };
  return train;
};

const addTrain = async (train) => {
  try {
    await Train.create(train);
  } catch (error) {
    console.error("Error at addTrain:", error.message);
  }
};

// ✅ FIXED: Processes trains sequentially to avoid memory crash
const addTrains = async (nos) => {
  console.log(`Starting to add ${nos} trains...`);
  for (let i = 0; i < nos; i++) {
    // Await the train generation since it now checks the DB
    const train = await generateRandomTrain();
    // Await the database insertion
    await addTrain(train);
    console.log(`Added train ${i + 1}/${nos}: ${train.name}`);
  }
  console.log("✅ Completed adding all trains.");
};

const runSeeder = async () => {
  await connectDB();
  // await addTrains(1000); // Start with a smaller number like 100 to test
  // Once confirmed it works, you can increase it to 1000
  process.exit(0); // Exit the script when done
};

runSeeder();
