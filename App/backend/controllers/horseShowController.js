// Load db config
const db = require("../../../../../App/backend/database/config");
const dotenv = require("dotenv").config();
// Load .env variables

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
// Export the functions as methods of an object
module.exports = {
    getHorseShows
  };