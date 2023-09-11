const jwtToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.loginUser = async (req, res) => {
  try {
    const userCredentials = { ...req.body };
    console.log(userCredentials);
    const userFromDB = await User.findOne({ email: userCredentials.email });
    // check is user exists in database
    if (!userFromDB) {
      return res.status(409).json({
        message: "wrong credentials",
      });
    }
    // check the user password
    const isPasswordValid = await bcrypt.compare(
      userCredentials.password,
      userFromDB.password
    );
    if (!isPasswordValid) {
      return res.status(409).json({
        message: "wrong credentials",
      });
    }
    //generating the web token for the user
    const token = jwtToken.sign(
      { userId: userFromDB._id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "logged in successfully",
      token,
      name: userFromDB.name,
      email: userFromDB.email,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const newUserDetails = { ...req.body };
    // checking if user is already registered or not
    const isUserExist = await User.findOne({ email: newUserDetails.email });
    if (isUserExist) {
      return res.status(409).json({
        message: "User already registered",
      });
    }
    // byrcrypting the password and saving in the backend.
    const salt = await bcrypt.genSalt(10);
    newUserDetails.password = await bcrypt.hash(newUserDetails.password, salt);

    const registeredUser = await User.create({ ...newUserDetails });
    //generating the web token for the user
    const token = jwtToken.sign(
      { userId: registeredUser._id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "30d" }
    );
    // sending the token to the frontend
    res.status(201).json({
      message: "user created",
      token,
      fullName: registeredUser.fullName,
      userName: registeredUser.userName,
      email: registeredUser.email,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
    });
  }
};
