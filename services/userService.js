let seq = 0;

let users = [];

/* Create a new user */
export function createNewUser(user) {
  users.push({ id: seq, ...user });

  seq++;
  return user;
}

/* Return all users */
export function findAllUsers() {
  return users;
}

/* Return the specified user by Id */
export function findUserById(id) {
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

/* Update a user by Id */
export function updateUser(id, updatedUser) {
  users = users.map((user) => {
    if (user.id === id) {
      return { ...user, ...updatedUser };
    }
    return user;
  });

  return findUserById(id);
}

/* Delete a specific user */
export function deleteUser(id) {
  const toBeRemoved = findUserById(id);

  users = users.filter((user) => user.id !== id);

  return toBeRemoved;
}
