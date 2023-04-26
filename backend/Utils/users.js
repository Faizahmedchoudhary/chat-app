const users = [];

console.log('l');
userJoin()
// Join user to chat
function userJoin  (data) {
  // const user = { id, username, room };
  console.log(data);

  // users.push(user);

  // return user;
}
module.exports = userJoin

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

// export default userJoin

