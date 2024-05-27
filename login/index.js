// login/index.js

const express = require('express');
const router = express.Router();

// GET request handler for rendering the login page
router.get('/', (req, res) => {
    res.render('login'); // Assuming your login page template is named 'login.ejs'
});

module.exports = router;
