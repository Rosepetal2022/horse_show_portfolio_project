// Load db config
const db = require("../database/config");
const dotenv = require("dotenv").config();
// Load .env variables
const lodash = require("lodash");

const getOwners = async (req, res) => {
    try {
      // Select all rows from the "bsg_people" table
      const query = "SELECT * FROM Owners";
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
    // Get the person ID
    const OwnerID = req.params.id;
    // Get the person object
    const newOwner = req.body;
  
    try {
      const [data] = await db.query("SELECT * FROM Owners WHERE OwnerID = ?", [
        OwnerID,
      ]);
      console.log(OwnerID)
  
      const oldOwner = data[0];
  
      // If any attributes are not equal, perform update
      if (!lodash.isEqual(newOwner, oldOwner)) {
        const query =
          "UPDATE Owners SET FirstName=?, LastName=?, Email=?, Address=? WHERE OwnerID = ?";
  
        const values = [
          newOwner.FirstName,
          newOwner.LastName,
          newOwner.Email,
          newOwner.Address,
        ];
  
        // Perform the update
        await db.query(query, values);
        // Inform client of success and return 
        return res.json({ message: "Person updated successfully." });
      }
  
      res.json({ message: "Person details are the same, no update" });
    } catch (error) {
      console.log("Error updating person", error);
      res
        .status(500)
        .json({ error: `Error updating the person with id ${OwnerID}` });
    }
  };
  
  const deleteOwner = async (req, res) => {
    console.log("Deleting owner with id:", req.params.id);
    const OwnerID = req.params.id;
    console.log("inside delete", OwnerID)
    try {
      // Ensure the person exitst
      const [isExisting] = await db.query(
        "SELECT 1 FROM Owners WHERE OwnerID = ?",
        [OwnerID]
      );
      console.log(OwnerID)
      // If the person doesn't exist, return an error
      if (isExisting.length === 0) {
        return res.status(404).send("Person not found");
      }
  
    // Delete the person from bsg_people
      await db.query("DELETE FROM Owners WHERE OwnerID = ?", [OwnerID]);
  
      // Return the appropriate status code
      res.status(204).json({ message: "Owner deleted successfully" })
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