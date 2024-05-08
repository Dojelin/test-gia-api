import cryptoJs from "crypto-js";
import { config } from "../config.js";

let seq = 0;
let users = [];

// Create a new user
export function createNewUser(user) {
  const newUser = {
    id: seq,
    name: user.name,
    userName: user.username,
  };

  if (user.password) {
    //Encrypt password using the crypto library and secret api key from config.js file
    newUser.password = cryptoJs.AES.encrypt(
      user.password,
      config.secretEncryption
    ).toString();
  }

  users.push(newUser);

  seq++;
  return user;
}

// Return all users
export function findAllUsers() {
  return users;
}

// Return the specified user by Id
export function findUserById(id) {
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

// Update a user by Id
export function updateUser(id, updatedUser) {
  users = users.map((user) => {
    if (user.id === id) {
      return { ...user, ...updatedUser };
    }
    return user;
  });

  return findUserById(id);
}

// Delete a specific user
export function deleteUser(id) {
  const toBeRemoved = findUserById(id);

  users = users.filter((user) => user.id !== id);

  return toBeRemoved;
}

// Show passsword
export function showPassword(id) {
  const user = findUserById(id);

  //Decrypt password using the crypto library
  const bytes = cryptoJs.AES.decrypt(user.password, config.secretEncryption);
  var originalPassword = bytes.toString(cryptoJs.enc.Utf8);
  cryptoJs;
  return originalPassword;
}
