// Load db config
const db = require("../database/config");
const dotenv = require("dotenv").config();
// Load .env variables

const getBets = async (req, res) => {
    try {
      // Select all rows from the "bsg_people" table
      const query = "SELECT * FROM Bets";
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

  const deleteBet = async (req, res) => {
    const BetID = req.params.BetID;
    
    try {
      // Ensure the person exitst
      const [isExisting] = await db.query(
        "SELECT 1 FROM Bets WHERE BetID = ?",
        [BetID]
      );
      
      // If the person doesn't exist, return an error
      if (isExisting.length === 0) {
        return res.status(404).send("Bet not found");
      }
  
    // Delete the person from bsg_people
      await db.query("DELETE FROM Bets WHERE BetID = ?", [BetID]);
      
  
      // Return the appropriate status code
      res.status(204).json({ message: "Bet deleted successfully" })
    } catch (error) {
      console.error("Error deleting Bet from the database:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const createBet = async (req, res) => {
    try {
      const {BetterID, HorseID, HorseShowID} = req.body;
      const query = "INSERT INTO Bets (BetterID, HorseID, HorseShowID) VALUES (?, ?, ?)";
  
      const response = await db.query(query, [
        BetterID,
        HorseID, 
        HorseShowID
      ]);
      console.log(response)
      res.status(201).json(response);
    } catch (error) {
      // Print the error for the dev
      console.error("Error creating bet:", error);
      // Inform the client of the error
      res.status(500).json({ error: "Error creating bet" });
    }
  }

  const updateBet= async (req, res) => {
    // Get the OwnerID from the request parameters
    const BetID = req.params.id;
    // Get the new owner data from the request body
    const newBet = req.body;
  
    try {
      // Fetch the current owner data from the database
      const [data] = await db.query("SELECT * FROM Bets WHERE BetID = ?", [BetID]);
      console.log('BetID:', BetID);
  
      if (data.length === 0) {
        return res.status(404).json({ message: "Bet not found" });
      }
  
      const oldBet = data[0];
      console.log('Old Bet', oldBet);
      console.log('New Bet', newBet);
  
      // If any attributes are not equal, perform the update
      if (!lodash.isEqual(newBet, oldBet)) {
        const query = "UPDATE Bets SET BetterID=?, HorseID=?, HorseShowID WHERE BetID = ?";
  
        const values = [
          newBet.BetterID,
          newBet.HorseID,
          newBet.HorseShowID,
          BetID  
        ];
  
        // Perform the update
        const [result] = await db.query(query, values);
        console.log('Update result:', result);
  
        if (result.affectedRows === 0) {
          return res.status(400).json({ message: "Update failed" });
        }
  
        // Inform the client of success
        return res.json({ message: "Bet updated successfully." });
      }
  
      // Inform the client that no update was necessary
      res.json({ message: "Bet details are the same, no update needed." });
    } catch (error) {
      console.log("Error updating Bet", error);
      res.status(500).json({ error: `Error updating the Bet with id ${BetID}` });
    }
  };
// Export the functions as methods of an object
module.exports = {
    getBets, 
    deleteBet,
    createBet,
    updateBet
};