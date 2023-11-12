const queries = {
    selectUserByEmail: 'SELECT * FROM users WHERE email IN ($1)',
    loginUser:'SELECT * FROM users WHERE email = $1 AND password = $2',
    insertUser: 'INSERT INTO users (email, password, username) VALUES ($1, $2, $3)',
    userUpdate:'UPDATE users SET username = $1, password = $2, resetToken = $3 WHERE id = $4'
  };
  
  module.exports = queries;