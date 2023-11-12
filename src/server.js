const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const passwordReset = require('./routes/passwordReset.js');

const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Use your routes
app.use(authRoutes);
app.use(passwordReset);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
