import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters long!" });
    }

    if (name.length < 3) {
      return res
        .status(400)
        .json({ message: "name should be at least 3 characters long!" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email!" });
    }

    const user = new User({
      email,
      name,
      password,
    });

    await user.save();

    const token = generateToken(user?._id);

    res.json({
      token,
      user: {
        _id: user?._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in Register Route", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = generateToken(user?._id);

    res.json({
      token,
      user: {
        _id: user?._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in Login Route", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
