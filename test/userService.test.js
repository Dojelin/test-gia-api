import {
  createNewUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
} from "../services/userService";

describe("User service", () => {
  test("Should create a new user", () => {
    const user = createNewUser({
      name: "Dummy name",
      userName: "Dummy userName",
      password: "12345",
    });

    expect(user.name).toEqual("Dummy name");
    expect(user.userName).toEqual("Dummy userName");
  });

  test("Should return all users", () => {
    const users = findAllUsers();

    expect(users.length).toEqual(1);
  });

  test("Should return a users by Id", () => {
    const user = findUserById(0);

    expect(user.name).toEqual("Dummy name");
    expect(user.userName).toEqual("Dummy userName");
    expect(user.password).toBeDefined();
  });

  test("Should update a user", () => {
    const user = updateUser(0, {
      name: "Updated name",
    });

    expect(user.name).toEqual("Updated name");
    expect(user.userName).toEqual("Dummy userName");
  });

  test("Should delete a user", () => {
    const deletedUser = deleteUser(0);

    try {
      const user = findUserById(0);
    } catch (error) {
      expect(error.message).toEqual("User not found");
    }

    expect(deletedUser).toBeDefined();
  });

  test("Should return error deleting a user that not exist", () => {
    let deletedUser;
    try {
      deletedUser = deleteUser(0);
    } catch (error) {
      expect(error.message).toEqual("User not found");
    }

    expect(deletedUser).toBeUndefined();
  });
});
