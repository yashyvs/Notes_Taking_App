import express from "express";
import userController from "../controllers/user-controller.js";

const userRoutes = express.Router();

userRoutes.post("/add-user", userController.addUser);
userRoutes.get("/view-user", userController.getAllUsers);
userRoutes.get("/view-user/:email", userController.getUserByEmail);
userRoutes.put("/update-password/:email", userController.updateUserPassword);
userRoutes.delete("/delete-user/:email", userController.deleteUserByEmail);

export default userRoutes;
