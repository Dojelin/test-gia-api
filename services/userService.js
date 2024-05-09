import cryptoJs from "crypto-js";
import { config } from "../config.js";
import {
  getAllUsersFromDb,
  getUserByIdFromDb,
  createUserInDb,
  updateUserInDb,
  deleteUserInDb,
} from "../repository/userRepository.js";

let seq = 1;
let users = [];

// Create a new user
export async function createNewUser(user) {
  const newUser = {
    id: seq,
    name: user.name,
    username: user.username,
  };

  if (user.password) {
    //Encrypt password using the crypto library and secret api key from config.js file
    newUser.password = cryptoJs.AES.encrypt(
      user.password,
      config.secretEncryption
    ).toString();
  }

  const result = await createUserInDb(newUser);

  seq++;
  return result;
}

// Return all users
export async function findAllUsers() {
  const usersDB = await getAllUsersFromDb();

  return usersDB;
}

// Return the specified user by Id
export async function findUserById(id) {
  const user = await getUserByIdFromDb(id);

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

// Update a user by Id
export async function updateUser(id, updatedUser) {
  const user = await updateUserInDb(id, updatedUser);

  return user;
}

// Delete a specific user
export async function deleteUser(id) {
  const toBeRemoved = await deleteUserInDb(id);

  return toBeRemoved;
}

// Show passsword
export async function showPassword(id) {
  const user = await getUserByIdFromDb(id);

  //Decrypt password using the crypto library
  const bytes = cryptoJs.AES.decrypt(user.password, config.secretEncryption);
  var originalPassword = bytes.toString(cryptoJs.enc.Utf8);
  cryptoJs;
  return originalPassword;
}
