const bcrypt = require('bcryptjs')

const User = require('../models/User');

const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(
            {
                email,
                password: hashedPassword
            }
        );
        await newUser.save();
        res.status(201).json({ message: `User registered with email ${email}` });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = register;