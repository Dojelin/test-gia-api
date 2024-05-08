import {
  createNewUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  showPassword,
} from "../services/userService.js";

export default function controller(app) {
  app.get("/users", (req, res) => {
    res.send(findAllUsers());
  });

  app.get("/users/:id", (req, res) => {
    res.send(findUserById(Number(req.params.id)));
  });

  app.post("/users", (req, res) => {
    res.send(createNewUser(req.body));
  });

  app.put("/users/:id", (req, res) => {
    res.send(updateUser(Number(req.params.id), req.body));
  });

  app.delete("/users/:id", (req, res) => {
    res.send(deleteUser(Number(req.params.id)));
  });

  app.get("/users/password/:id", (req, res) => {
    res.send(showPassword(Number(req.params.id)));
  });
}
