
const db = require('../database/config');
const dotenv = require("dotenv").config();
const lodash = require("lodash");

const getOwners = async (req, res) => {
    try {
      // Select all rows from the Owners table
      const query = "SELECT * FROM Owners";
      const [rows] = await db.query(query);
      console.log(rows)
      // Send back the rows to the client
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching owners from the database:", error);
      res.status(500).json({ error: "Error fetching owners" });
    }
  };


const createOwner = async (req, res) => {
    try {
      const { FirstName, LastName, Email, Address } = req.body;
      const query =
      "INSERT INTO Owners (FirstName, LastName, Email, Address) VALUES (?, ?, ?, ?)";
  
      const response = await db.query(query, [
        FirstName,
        LastName,
        Email,
        Address,
      ]);
      console.log(response)
      res.status(201).json(response);
    } catch (error) {
      // Print the error for the dev
      console.error("Error creating owner:", error);
      // Inform the client of the error
      res.status(500).json({ error: "Error creating owner" });
    }
  };

  
  const updateOwner = async (req, res) => {
    // Get the OwnerID from the request parameters
    const OwnerID = req.params.id;
    // Get the new owner data from the request body
    const newOwner = req.body;
  
    try {
      // Fetch the current owner data from the database
      const [data] = await db.query("SELECT * FROM Owners WHERE OwnerID = ?", [OwnerID]);
      console.log('OwnerID:', OwnerID);
  
      if (data.length === 0) {
        return res.status(404).json({ message: "Owner not found" });
      }
  
      const oldOwner = data[0];
      console.log('Old Owner:', oldOwner);
      console.log('New Owner:', newOwner);
  
      // If any attributes are not equal, perform the update
      if (!lodash.isEqual(newOwner, oldOwner)) {
        const query = "UPDATE Owners SET FirstName=?, LastName=?, Email=?, Address=? WHERE OwnerID = ?";
  
        const values = [
          newOwner.FirstName,
          newOwner.LastName,
          newOwner.Email,
          newOwner.Address,
          OwnerID  
        ];
  
        // Perform the update
        const [result] = await db.query(query, values);
        console.log('Update result:', result);
  
        if (result.affectedRows === 0) {
          return res.status(400).json({ message: "Update failed" });
        }
  
        // Inform the client of success
        return res.json({ message: "Owner updated successfully." });
      }
  
      // Inform the client that no update was necessary
      res.json({ message: "Owner details are the same, no update needed." });
    } catch (error) {
      console.log("Error updating owner", error);
      res.status(500).json({ error: `Error updating the owner with id ${OwnerID}` });
    }
  };
  
  const deleteOwner = async (req, res) => {
    const OwnerID = req.params.OwnerID;
    
    try {
      // Ensure the owner exists
      const [isExisting] = await db.query(
        "SELECT 1 FROM Owners WHERE OwnerID = ?",
        [OwnerID]
      );
      
      // If the owner doesn't exist, return an error
      if (isExisting.length === 0) {
        return res.status(404).send("Person not found");
      }
  
    // Delete the owner from Owner table
      await db.query("DELETE FROM Owners WHERE OwnerID = ?", [OwnerID]);
      
  
      // Return the appropriate status code
      res.status(204).json({ message: "Owner deleted successfully" })
      console.log("inside delete", OwnerID)
    } catch (error) {
      console.error("Error deleting Owner from the database:", error);
      res.status(500).json({ error: error.message });
    }
  };
// Export the functions as methods of an object
module.exports = {
    getOwners,
    createOwner,
    updateOwner,
    deleteOwner,
  };