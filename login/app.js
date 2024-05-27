const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://kashisharorasahib:7r9EI9hmwzuI2STz@cluster0.cg6tag1.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// User schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Root route
app.get('/', (req, res) => {
    res.redirect('/login');  // Redirect to the login page
    // Alternatively, you can render a different page:
    // res.render('index');  // Make sure you have an 'index.ejs' file in your 'views' directory
});

// Login form route
app.get('/login', (req, res) => {
    res.render('login');
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });  // Debug log

    const user = await User.findOne({ username });
    console.log('User found:', user);  // Debug log

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);  // Debug log

        if (isMatch) {
            req.session.user = user;
            return res.send('Logged in successfully');
        }
    }
    res.send('Invalid username or password');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
