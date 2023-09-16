import User from "../models/user-model.js";

const userService = {
  async addUser(userData) {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (err) {
      throw err;
    }
  },

  async getAllUsers() {
    try {
      const users = await User.find(); // Retrieve all users from the database
      return users;
    } catch (err) {
      throw err;
    }
  },

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (err) {
      throw err;
    }
  },

  async updateUserPassword(email, newPassword) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      user.password = newPassword;
      const updatedUser = await user.save();
      return updatedUser;
    } catch (err) {
      throw err;
    }
  },

  async deleteUserByEmail(email) {
    try {
      const deletedUser = await User.findOneAndDelete({ email });
      return deletedUser;
    } catch (err) {
      throw err;
    }
  },
};

export default userService;
