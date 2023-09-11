const User = require("../models/userModel");

// controller function to fetch all users of the our class
exports.fetchUsers = async (req, res) => {
  const { userId } = req.body;
  const searchedQuery = req.query.searchedUser;
  try {
    // Fetch all users from the database, excluding the password field
    const users = await User.find({}, "-password");

    // Filter users based on the searchedUser query parameter
    const filteredUsers = users.filter(
      (user) =>
        user.userName.includes(searchedQuery) && user._id.toString() !== userId
    );
    res.status(200).json({ message: "success", users: filteredUsers });
  } catch (error) {
    console.error("Error fetching all users from the class:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the chats." });
  }
};
