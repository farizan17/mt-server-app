const User = require("../../model/User");
const expressAsyncHandler = require("express-async-handler");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req?.body;

  // Check if user exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) throw new Error("User already exists");

  try {
    const user = await User.create({
      email,
      firstname,
      lastname,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.json(error);
  }
});

//fetch all users
const fetchUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { registerUser, fetchUsers };
