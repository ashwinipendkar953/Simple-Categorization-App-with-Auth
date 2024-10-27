const User = require("../models/userModel");

const saveUserInterestsController = async (req, res) => {
  try {
    const userId = req.userId;
    const { interests } = req.body;

    const user = await User.findById(userId);
    if (user) {
      user.interests = interests;
      await user.save();
      res.status(200).send({ message: "User updated successfully.", user });
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user interests:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = saveUserInterestsController;
