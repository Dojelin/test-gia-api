
var users = [{
    id: 1,
    name: 'Dummy Desjardins',
    username: 'dummy123'
}];

export function createNewUser(user) {
    users.push(user);
    return user;
  }

export function  findAllUsers() {
    return users;
  }

export function findUserById(id) {
    const user = users.find((user) => user.id === id);

    if(!user){
        throw new Error('User not found');
    }
    return user;
  }

export function updateUser(id, updatedUser) {
    users = users.map(user => {
        if(user.id === id){
            return {...user, ...updatedUser};
        }
        return user;
    });

    return findUserById(id);
  }

  export function deleteUser(id) {
    const toBeRemoved = findUserById(id);

    users = users.filter(user => user.id !== id);

    return toBeRemoved;
  }
