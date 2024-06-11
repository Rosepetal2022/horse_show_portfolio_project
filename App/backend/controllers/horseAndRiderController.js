// Load db config
const db = require("../database/config");
const dotenv = require("dotenv").config();
const lodash = require("lodash")

const getSpecificHorse = async (req, res) => {

  try {
    // Fetch the current data from the database
    const [rows] = await db.query("SELECT HAndRID, Horses.ShowName AS HorseName, \n CONCAT(Riders.FirstName, ' ', Riders.LastName) AS RiderName \n FROM Horses JOIN HorsesAndRiders ON Horses.HorseID = HorsesAndRiders.HorseID \n JOIN Riders ON HorsesAndRiders.RiderID = Riders.RiderID;");
    console.log(rows)

    res.status(200).json(rows);

  } catch (error) {
    console.log("Error updating Horse and Rider", error);
    res.status(500).json({ error: `Error updating the Horse with id ${HorseID}` });
  }
};

const deleteHorseAndRider = async (req, res) => {
  const HAndRID = req.params.HAndRID;
  
  try {
    // Ensure the pair exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM HorsesAndRiders WHERE HAndRID = ?",
      [HAndRID]
    );
    
    // If the pair doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("HorseAndRider not found");
    }

  // Delete the HorseAndRider from the table
    await db.query("DELETE FROM HorsesAndRiders WHERE HAndRID = ?", [HAndRID]);
    

    // Return the appropriate status code
    res.status(204).json({ message: "Horse and Rider deleted successfully" })
  } catch (error) {
    console.error("Error deleting Horse from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

const createHAndR = async (req, res) => {
  try {
    const {RiderID, HorseID} = req.body;
    const query = "INSERT INTO HorsesAndRiders (RiderID, HorseID) VALUES (?, ?)";

    const response = await db.query(query, [
      RiderID,
      HorseID
    ]);
    console.log(response)
    res.status(201).json(response);
  } catch (error) {
    // Print the error
    console.error("Error creating horse:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating horse" });
  }
}

const updateHAndR = async (req, res) => {
  // Get the HorseAndRiderID from the request parameters
  const HAndRID = req.params.id;
  // Get the new data from the request body
  const newHAndR = req.body;

  try {
    // Fetch the current data from the database
    const [data] = await db.query("SELECT * FROM HorsesAndRiders WHERE HAndRID = ?", [HAndRID]);
    console.log('HAndRID:', HAndRID);

    if (data.length === 0) {
      return res.status(404).json({ message: "Horse not found" });
    }

    const oldHAndR = data[0];
    console.log('Old HorseAndRiders:', oldHAndR);
    console.log('New HorseAndRiders:', newHAndR);

    // If any attributes are not equal, perform the update
    if (!lodash.isEqual(newHAndR, oldHAndR)) {
      const query = "UPDATE HorsesAndRiders SET RiderID=?, HorseID=? WHERE HAndRID = ?";

      const values = [
        newHAndR.RiderID,
        newHAndR.HorseID,
        HAndRID  
      ];

      // Perform the update
      const [result] = await db.query(query, values);
      console.log('Update result:', result);

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Update failed" });
      }

      // Inform the client of success
      return res.json({ message: "Horse updated successfully." });
    }

    // Inform the client that no update was necessary
    res.json({ message: "HorseAndRiders details are the same, no update needed." });
  } catch (error) {
    console.log("Error updating Horse", error);
    res.status(500).json({ error: `Error updating the HorseAndRiders with id ${HAndRID}` });
  }
};

// Export the functions as methods of an object
module.exports = {
    getSpecificHorse,
    deleteHorseAndRider,
    createHAndR,
    updateHAndR
  };
