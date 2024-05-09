import express from "express";
var app = express();

import routes from "./controllers/usersController.js";

// Parse incoming JSON data from HTTP requests
app.use(express.json());

// Add routes
routes(app);

//Middleware to handler errors
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});
