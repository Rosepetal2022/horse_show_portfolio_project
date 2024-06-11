const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8500;
// This code was used from the started guide from Oregon State University

// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173 
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// API Routes for backend CRUD:
app.use('/horses', require("./routes/horses"));
app.use('/owners', require("./routes/owners"));
app.use('/riders', require('./routes/riders'));
app.use('/betters', require("./routes/betters"));
app.use('/horseShows', require("./routes/horseShows"));
app.use('/horseAndRiders', require("./routes/horseAndRiders"));
app.use('/bets', require('./routes/bets'))

app.listen(PORT, () => {
  // Change this text to whatever FLIP server you're on
  console.log(`Server running:  http://flip2.engr.oregonstate.edu:${PORT}...`);
});
