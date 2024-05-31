// Load db config
const db = require("../database/config");
const dotenv = require("dotenv").config();
// Load .env variables
const lodash = require("lodash");

const getHorses = async (req, res) => {
    try {
      // Select all rows from the "bsg_people" table
      const query = "SELECT * FROM Horses";
      // Execute the query using the "db" object from the configuration file
      const [rows] = await db.query(query);
      console.log(rows)
      // Send back the rows to the client
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching people from the database:", error);
      res.status(500).json({ error: "Error fetching people" });
    }
  };

  const createHorse = async (req, res) => {
    try {
      const { ShowName, Breed, Age, Discipline, PrizeMoneyWon, OwnerID } = req.body;
      const query = "INSERT INTO Horses (ShowName, Breed, Age, Discipline, PrizeMoneyWon, OwnerID) VALUES (?, ?, ?, ?, ?, ?)";

      const response = await db.query(query, [
        ShowName,
        Breed,
        Age,
        Discipline,
        PrizeMoneyWon, 
        OwnerID
      ]);
      console.log(response)
      res.status(201).json(response);
    } catch (error) {
      // Print the error for the dev
      console.error("Error creating horse:", error);
      // Inform the client of the error
      res.status(500).json({ error: "Error creating horse" });
    }
  }

  const updateHorse = async (req, res) => {
    // Get the OwnerID from the request parameters
    const HorseID = req.params.id;
    // Get the new owner data from the request body
    const newHorse = req.body;
  
    try {
      // Fetch the current owner data from the database
      const [data] = await db.query("SELECT * FROM Horses WHERE HorseID = ?", [HorseID]);
      console.log('HorseID:', HorseID);
  
      if (data.length === 0) {
        return res.status(404).json({ message: "Horse not found" });
      }
  
      const oldHorse = data[0];
      console.log('Old Horse:', oldHorse);
      console.log('New Horse:', newHorse);
  
      // If any attributes are not equal, perform the update
      if (!lodash.isEqual(newHorse, oldHorse)) {
        const query = "UPDATE Horses SET ShowName=?, Breed=?, Age=?, Discipline=?, PrizeMoneyWon=? WHERE HorseID = ?";
  
        const values = [
          newHorse.ShowName,
          newHorse.Breed,
          newHorse.Age,
          newHorse.Discipline,
          newHorse.PrizeMoneyWon,
          HorseID  // Add the OwnerID here
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
      res.json({ message: "Horse details are the same, no update needed." });
    } catch (error) {
      console.log("Error updating Horse", error);
      res.status(500).json({ error: `Error updating the Horse with id ${HorseID}` });
    }
  };

  const deleteHorse = async (req, res) => {
    const HorseID = req.params.HorseID;
    
    try {
      // Ensure the person exitst
      const [isExisting] = await db.query(
        "SELECT 1 FROM Horses WHERE HorseID = ?",
        [HorseID]
      );
      
      // If the person doesn't exist, return an error
      if (isExisting.length === 0) {
        return res.status(404).send("Horse not found");
      }
  
    // Delete the person from bsg_people
      await db.query("DELETE FROM Horses WHERE HorseID = ?", [HorseID]);
      
  
      // Return the appropriate status code
      res.status(204).json({ message: "Horse deleted successfully" })
    } catch (error) {
      console.error("Error deleting Horse from the database:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
// Export the functions as methods of an object
module.exports = {
    getHorses, 
    createHorse, 
    updateHorse, 
    deleteHorse
  };