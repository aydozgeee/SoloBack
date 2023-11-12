const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const router = express.Router();
const { db  } = require('../config/config');
const { selectUserByEmail, insertUser} = require('../queries/userQueries');
const saltRounds = 10;
router.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;

  try {
      const hashedPass=await bcrypt.hash(password, saltRounds);
      const checkQuery = {
          text: selectUserByEmail,
          values: [email],
      };

      db.query(checkQuery)
          .then((result) => {
              const existingUser = result.rows[0];
              if (existingUser) {
                  res.status(200).json({ message: 'User already exists', uid: existingUser.uid });
              } else {
                  const insertQuery = {
                      text: insertUser,
                      values: [email, hashedPass, username],
                  };
                  db.query(insertQuery)
                      .then(() => {
                          res.status(201).json({ message: 'User is saved', });
                      })
                      .catch((insertError) => {
                          res.status(500).json({ message: 'Database error', error: insertError.message });
                      });
              }
          })
          .catch((checkError) => {
              res.status(500).json({ message: 'Database error', error: checkError.message });
          });
  } catch (error) {
      res.status(400).json({ message: 'Error', error: error.message });
  }
});  
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkQuery = {
      text: selectUserByEmail,
      values: [email],
    };

    const result = await db.query(checkQuery);
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', uid: user.uid });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});
  

module.exports = router;
