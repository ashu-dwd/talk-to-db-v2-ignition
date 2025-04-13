const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const handleUserLogin = async (email, password) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error("Invalid password");
        error.statusCode = 401;
        throw error;
    }

    // Create JWT
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || "Ashu@#23",
        { expiresIn: "7d" }
    );

    return {
        message: "Login successful",
        user: {
            name: user.name,
            email: user.email
        },
        token
    };
};


// Handle User Registration
const handleUserRegistration = async (name, email, password) => {
    if (!name || !email || !password) {
        throw new Error("Name, email, and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();

    return "Registration successful";
};

module.exports = { handleUserLogin, handleUserRegistration };
