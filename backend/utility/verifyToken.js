const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../Model/userModel");
dotenv.config();

const decodeJwt = async (token) => {
  try {
    if (!token) return res.status(401).json({ message: "access token required" });
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decode.id).select("-password");
    return user;
  } catch (error) {
    return null;
  }
};
module.exports = { decodeJwt };
