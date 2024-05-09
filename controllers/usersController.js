import {
  createNewUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  showPassword,
} from "../services/userService.js";

export default function controller(app) {
  //Get the list of all users
  app.get("/users", (req, res) => {
    res.send(findAllUsers());
  });

  //Get a user by id
  app.get("/users/:id", (req, res) => {
    res.send(findUserById(Number(req.params.id)));
  });

  //Create a new user
  app.post("/users", (req, res) => {
    res.send(createNewUser(req.body));
  });

  //Update a existing user
  app.put("/users/:id", (req, res) => {
    res.send(updateUser(Number(req.params.id), req.body));
  });

  //Delete a user
  app.delete("/users/:id", (req, res) => {
    res.send(deleteUser(Number(req.params.id)));
  });

  //Show user password
  app.get("/users/password/:id", (req, res) => {
    res.send(showPassword(Number(req.params.id)));
  });
}
