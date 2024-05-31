// Load db config
const db = require("../database/config");
const dotenv = require("dotenv").config();
// Load .env variables
const lodash = require("lodash");

const getHorseShows = async (req, res) => {
    try {
      // Select all rows from the "bsg_people" table
      const query = "SELECT * FROM HorseShows";
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

  const createHorseShow = async (req, res) => {
    try {
      const { HorseShowName, ShowDate, Location, PrizeMoneyOffered, NumEnteredHorse } = req.body;
      const query =
      "INSERT INTO HorseShows (HorseShowName, ShowDate, Location, PrizeMoneyOffered, NumEnteredHorse) VALUES (?, ?, ?, ?, ?)";
  
      const response = await db.query(query, [
        HorseShowName,
        ShowDate, 
        Location, 
        PrizeMoneyOffered,
        NumEnteredHorse
      ]);
      console.log(response)
      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating rider:", error);
      res.status(500).json({ error: "Error creating rider" });
    }
  };
  
  
  const updateHorseShow = async (req, res) => {
    // Get the HorseShowID from the request parameters
    const HorseShowID = req.params.id;
    // Get the new HorseShow data from the request body
    const newHorseShow = req.body;
  
    try {
      // Fetch the current HorseShow data from the database
      const [data] = await db.query("SELECT * FROM HorseShows WHERE HorseShowID = ?", [HorseShowID]);
      console.log('HorseShowID:', HorseShowID);
  
      if (data.length === 0) {
        return res.status(404).json({ message: "HorseShow not found" });
      }
  
      const oldHorseShow = data[0];
      console.log('Old HorseShow:', oldHorseShow);
      console.log('New HorseShow:', newHorseShow);
  
      // If any attributes are not equal, perform the update
      if (!lodash.isEqual(newHorseShow, oldHorseShow)) {
        const query = "UPDATE HorseShows SET HorseShowName=?, ShowDate=?, Location=?, PrizeMoneyOffered=?, NumEnteredHorse=? WHERE HorseShowID = ?";
  
        const values = [
          newHorseShow.HorseShowName,
          newHorseShow.ShowDate,
          newHorseShow.Location,
          newHorseShow.PrizeMoneyOffered,
          newHorseShow.NumEnteredHorse,
          HorseShowID  // Add the HorseShowID here
        ];
  
        // Perform the update
        const [result] = await db.query(query, values);
        console.log('Update result:', result);
  
        if (result.affectedRows === 0) {
          return res.status(400).json({ message: "Update failed" });
        }
  
        // Inform the client of success
        return res.json({ message: "HorseShow updated successfully." });
      }
  
      // Inform the client that no update was necessary
      res.json({ message: "HorseShow details are the same, no update needed." });
    } catch (error) {
      console.log("Error updating HorseShow", error);
      res.status(500).json({ error: `Error updating the HorseShow with id ${HorseShowID}` });
    }
  };
  
  const deleteHorseShow = async (req, res) => {
    const HorseShowID = req.params.HorseShowID;
    
    try {
      // Ensure the person exitst
      const [isExisting] = await db.query(
        "SELECT 1 FROM HorseShows WHERE HorseShowID = ?",
        [HorseShowID]
      );
      
      // If the person doesn't exist, return an error
      if (isExisting.length === 0) {
        return res.status(404).send("Person not found");
      }
  
    // Delete the person from bsg_people
      await db.query("DELETE FROM HorseShows WHERE HorseShowID = ?", [HorseShowID]);
      
  
      // Return the appropriate status code
      res.status(204).json({ message: "HorseShow deleted successfully" })
      console.log("inside delete", HorseShowID)
    } catch (error) {
      console.error("Error deleting HorseShow from the database:", error);
      res.status(500).json({ error: error.message });
    }
  };
// Export the functions as methods of an object
module.exports = {
    getHorseShows,
    createHorseShow,
    updateHorseShow,
    deleteHorseShow
  };
