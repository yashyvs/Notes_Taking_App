import userService from "../services/user-service.js";

const userController = {
  async addUser(req, res) {
    const { email, password, name, phone } = req.body;

    try {
      const user = await userService.getUserByEmail(email);
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = await userService.addUser({
        email,
        password,
        name,
        phone,
      });
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding user" });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ users });
    } catch (err) {
      res.status(500).json({ message: "Error fetching users" });
    }
  },

  async getUserByEmail(req, res) {
    const { email } = req.params;

    try {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ message: "Error fetching user" });
    }
  },

  async updateUserPassword(req, res) {
    const { email } = req.params;
    const { newPassword } = req.body;

    try {
      const updatedUser = await userService.updateUserPassword(
        email,
        newPassword
      );
      res
        .status(200)
        .json({ message: "Password updated successfully", user: updatedUser });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error updating password" });
    }
  },

  async deleteUserByEmail(req, res) {
    const { email } = req.params;

    try {
      const deletedUser = await userService.deleteUserByEmail(email);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "User deleted successfully", user: deletedUser });
    } catch (err) {
      res.status(500).json({ message: "Error deleting user" });
    }
  },
};

export default userController;
