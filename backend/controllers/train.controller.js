import Train from "../models/train.model.js";

const train = {
  name: "Train A",
  stops: [
    {
      name: "Chennai",
      distanceFromPreviousStop: 0,
      depatureTime: "1970-01-01T09:00:00.000",
    },
    {
      name: "Vellore",
      distanceFromPreviousStop: 170,
      depatureTime: "1970-01-01T11:00:00.000",
    },
    {
      name: "Bangalore",
      distanceFromPreviousStop: 200,
      depatureTime: "1970-01-01T15:30:00.000",
    },
    {
      name: "Mysuru",
      distanceFromPreviousStop: 120,
      depatureTime: "1970-01-01T17:30:00.000",
    },
    {
      name: "Mangalore",
      distanceFromPreviousStop: 300,
      depatureTime: "1970-01-01T21:45:00.000",
    },
  ],
};

const addTrain = async (train) => {
    try {
        const storedTrain = await Train.create(train);
        console.log(storedTrain);
    } catch (error) {
        console.log("Error at add Train : ",error);
    }
};
addTrain(train);