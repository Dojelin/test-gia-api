import express from "express";
var app = express();

import routes from "./controllers/usersController.js";

// Parse incoming JSON data from HTTP requests
app.use(express.json());

// Add routes
routes(app);

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});
