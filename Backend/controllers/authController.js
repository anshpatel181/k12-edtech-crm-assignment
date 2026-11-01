import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const result = await db.query("select * from admin_cred where email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const fetchedPassword = result.rows[0].password;

    const isMatch = await bcrypt.compare(password, fetchedPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: result.rows[0].id, role: "Admin" },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2d",
      },
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("__adminToken", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 2 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res
      .status(200)
      .json({ success: true, message: "You have logged in successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server error occurred",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("__adminToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging out, Please try again.",
    });
  }
};

export const getCurrentAdmin = async (req, res) => {
  return res.status(200).json({
    success: true,
    isAuthenticated: true,
    admin: req.admin,
  });
};
