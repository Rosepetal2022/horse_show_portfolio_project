// Load db config
const db = require("../database/config");
const dotenv = require("dotenv").config();
// Load .env variables
const lodash = require("lodash");

const getRiders = async (req, res) => {
    try {
      // Select all rows from the "bsg_people" table
      const query = "SELECT * FROM Riders";
      // Execute the query using the "db" object from the configuration file
      const [rows] = await db.query(query);
      console.log(rows)
      // Send back the rows to the client
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching riders from the database:", error);
      res.status(500).json({ error: "Error fetching riders" });
    }
  };


const createRider = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Address } = req.body;
    const query =
    "INSERT INTO Riders (FirstName, LastName, Email, Address) VALUES (?, ?, ?, ?)";

    const response = await db.query(query, [
      FirstName,
      LastName,
      Email,
      Address,
    ]);
    console.log(response)
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating rider:", error);
    res.status(500).json({ error: "Error creating rider" });
  }
};


const updateRider = async (req, res) => {
  // Get the RiderID from the request parameters
  const RiderID = req.params.id;
  // Get the new Rider data from the request body
  const newRider = req.body;

  try {
    // Fetch the current Rider data from the database
    const [data] = await db.query("SELECT * FROM Riders WHERE RiderID = ?", [RiderID]);
    console.log('RiderID:', RiderID);

    if (data.length === 0) {
      return res.status(404).json({ message: "Rider not found" });
    }

    const oldRider = data[0];
    console.log('Old Rider:', oldRider);
    console.log('New Rider:', newRider);

    // If any attributes are not equal, perform the update
    if (!lodash.isEqual(newRider, oldRider)) {
      const query = "UPDATE Riders SET FirstName=?, LastName=?, Email=?, Address=? WHERE RiderID = ?";

      const values = [
        newRider.FirstName,
        newRider.LastName,
        newRider.Email,
        newRider.Address,
        RiderID  // Add the RiderID here
      ];

      // Perform the update
      const [result] = await db.query(query, values);
      console.log('Update result:', result);

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Update failed" });
      }

      // Inform the client of success
      return res.json({ message: "Rider updated successfully." });
    }

    // Inform the client that no update was necessary
    res.json({ message: "Rider details are the same, no update needed." });
  } catch (error) {
    console.log("Error updating Rider", error);
    res.status(500).json({ error: `Error updating the Rider with id ${RiderID}` });
  }
};

const deleteRider = async (req, res) => {
  const RiderID = req.params.RiderID;
  
  try {
    // Ensure the person exitst
    const [isExisting] = await db.query(
      "SELECT 1 FROM Riders WHERE RiderID = ?",
      [RiderID]
    );
    
    // If the person doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Person not found");
    }

  // Delete the person from bsg_people
    await db.query("DELETE FROM Riders WHERE RiderID = ?", [RiderID]);
    

    // Return the appropriate status code
    res.status(204).json({ message: "Rider deleted successfully" })
    console.log("inside delete", RiderID)
  } catch (error) {
    console.error("Error deleting Rider from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
    getRiders,
    createRider,
    updateRider,
    deleteRider
  };
