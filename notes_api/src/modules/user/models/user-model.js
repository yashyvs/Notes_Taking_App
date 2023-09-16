import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 25,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    // match: /^[A-Za-z]+$/, // Alphabet-only validation
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    match: /^\d+$/, // Numeric-only validation
  },
});

// Pre-save hook to encrypt the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
