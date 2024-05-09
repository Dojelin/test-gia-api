import {
  createNewUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  showPassword,
} from "../services/userService.js";

export default async function controller(app) {
  //Get the list of all users
  app.get("/users", async (req, res) => {
    const result = await findAllUsers();
    res.send(result);
  });

  //Get a user by id
  app.get("/users/:id", async (req, res) => {
    const result = await findUserById(Number(req.params.id));
    res.send(result);
  });

  //Create a new user
  app.post("/users", async (req, res) => {
    const result = await createNewUser(req.body);
    res.send(result);
  });

  //Update a existing user
  app.put("/users/:id", async (req, res) => {
    const result = await updateUser(Number(req.params.id), req.body);
    res.send(result);
  });

  //Delete a user
  app.delete("/users/:id", async (req, res) => {
    const result = await deleteUser(Number(req.params.id));
    res.send(result);
  });

  //Show user password
  app.get("/users/password/:id", async (req, res) => {
    const result = await showPassword(Number(req.params.id));
    res.send(result);
  });
}
