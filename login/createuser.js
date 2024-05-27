const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb+srv://kashisharorasahib:7r9EI9hmwzuI2STz@cluster0.cg6tag1.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

const createUser = async () => {
    const username = 'kash';
    const password = 'kashish12';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        password: hashedPassword
    });

    await newUser.save();
    console.log('User created successfully');
    mongoose.connection.close();
};

createUser().catch(err => console.log(err));
