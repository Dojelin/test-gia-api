import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

export function initDatabase() {
  db.serialize(() => {
    db.run(
      "CREATE TABLE user (id INT, name TEXT, username TEXT, password TEXT)"
    );

    db.run(
      "INSERT INTO user VALUES (0, 'Admin', 'Admin', 'U2FsdGVkX18Iqa3DuaHxOYFmyqqomM9Tl2I9L/MsljI=')"
    );
  });
}

export async function getAllUsersFromDb() {
  let result = await new Promise((resolve, reject) => {
    const users = [];

    db.each("SELECT id, name, username, password FROM user", [], (err, row) => {
      if (err) reject(err);
      users.push(row);
      resolve(users);
    });
  });
  return result;
}

export async function getUserByIdFromDb(id) {
  let result = await new Promise((resolve, reject) => {
    db.each(
      "SELECT id, name, username, password FROM user WHERE id = ?",
      [id],
      (err, user) => {
        if (err) reject(err);
        resolve(user);
      }
    );
  });
  return result;
}

export async function createUserInDb(user) {
  let result = await new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO user (id, name, username, password) VALUES (?, ?, ?, ?)",
      [user.id, user.name, user.username, user.password],
      (err, res) => {
        if (err) reject(err);
        console.log(res);
        resolve(user);
      }
    );
  });
  return result;
}

export async function updateUserInDb(id, user) {
  let result = await new Promise((resolve, reject) => {
    db.run(
      "UPDATE user SET name = ?, username = ? WHERE id = ?",
      [user.name, user.username, id],
      (err, user) => {
        if (err) reject(err);
        resolve(user);
      }
    );
  });
  return result;
}

export async function deleteUserInDb(id) {
  let result = await new Promise((resolve, reject) => {
    db.run("DELETE FROM user WHERE id = ?", [id], (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
  return result;
}

export async function closeDatabase() {
  db.close();
}
