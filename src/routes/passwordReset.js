const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const { db  } = require('../config/config');
app.use(bodyParser.urlencoded({ extended: false }));
const router = express.Router();
const { selectUserByEmail} = require('../queries/userQueries');
const { updateUser,sendResetEmail,generateResetToken} = require('../utils/updateUsers');


router.post('/forgot-password', async (req, res) => {
    console.log("denemeeee")
    const { email } = req.body;

    const checkQuery = {
        text: selectUserByEmail,
        values: [email],
    };

    try {
        const result = await db.query(checkQuery);
        const user = result.rows[0];
        console.log("ndsnsadnsan",user,email)
        if (user) {
            const resetToken = generateResetToken();
            user.resetToken = resetToken;
            // await updateUser(user);

            sendResetEmail(email, resetToken);
            console.log("generateResetToken"),generateResetToken
            res.status(200).json({ message: 'Reset email sent' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database error', error: error.message });
    }
});
module.exports = router;
