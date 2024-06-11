// Load db config
const db = require("../database/config");
const dotenv = require("dotenv").config();
// Load .env variables

const getBetters = async (req, res) => {
    try {
      // Select all rows from the "bsg_people" table
      const query = "SELECT * FROM Betters";
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

  const createBetters = async (req, res) => {
    try {
      const { FirstName, LastName, BetterAmount } = req.body;
      const query =
      "INSERT INTO Betters (FirstName, LastName, BetterAmount) VALUES (?, ?, ?)";
  
      const response = await db.query(query, [
        FirstName,
        LastName,
        BetterAmount,
      ]);
      console.log(response)
      res.status(201).json(response);
    } catch (error) {
      // Print the error for the dev
      console.error("Error creating better:", error);
      // Inform the client of the error
      res.status(500).json({ error: "Error creating better" });
    }
  };


  const deleteBetters = async (req, res) => {
    const BetterID = req.params.BetterID;
    
    try {
      // Ensure the person exitst
      const [isExisting] = await db.query(
        "SELECT 1 FROM Betters WHERE BetterID = ?",
        [BetterID]
      );
      
      // If the person doesn't exist, return an error
      if (isExisting.length === 0) {
        return res.status(404).send("Better not found");
      }
  
    // Delete the person from bsg_people
      await db.query("DELETE FROM Betters WHERE BetterID = ?", [BetterID]);
      
  
      // Return the appropriate status code
      res.status(204).json({ message: "Better deleted successfully" })
      console.log("inside delete Betters", BetterID)
    } catch (error) {
      console.error("Error deleting Better from the database:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const updateBetters = async (req, res) => {
    // Get the OwnerID from the request parameters
    const BetterID = req.params.id;
    // Get the new owner data from the request body
    const newBetter = req.body;
  
    try {
      // Fetch the current owner data from the database
      const [data] = await db.query("SELECT * FROM Betters WHERE BetterID = ?", [BetterID]);
      console.log('BetterID:', BetterID);
  
      if (data.length === 0) {
        return res.status(404).json({ message: "Better not found" });
      }
  
      const oldBetter = data[0];
      console.log('Old Better:', oldBetter);
      console.log('New Better:', newBetter);
  
      // If any attributes are not equal, perform the update
      if (!lodash.isEqual(newOwner, oldOwner)) {
        const query = "UPDATE Betters SET FirstName=?, LastName=?, Amount=? WHERE BetterID = ?";
  
        const values = [
          newBetter.FirstName,
          newBetter.LastName,
          newBetter.Amount,
          BetterID  
        ];
  
        // Perform the update
        const [result] = await db.query(query, values);
        console.log('Update result:', result);
  
        if (result.affectedRows === 0) {
          return res.status(400).json({ message: "Update failed" });
        }
  
        // Inform the client of success
        return res.json({ message: "Better updated successfully." });
      }
  
      // Inform the client that no update was necessary
      res.json({ message: "Better details are the same, no update needed." });
    } catch (error) {
      console.log("Error updating better", error);
      res.status(500).json({ error: `Error updating the better with id ${BetterID}` });
    }
  };
  
// Export the functions as methods of an object
module.exports = {
    getBetters,
    createBetters,
    deleteBetters,
    updateBetters,
  };