const UserModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { decodeJwt } = require("../utility/verifyToken");

const signUp = async (req, res) => {
  try {
    const { email, password, name, role, department } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, error: "User already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ email, name, password: hashedPassword, role, department });

    await newUser.save();
    return res.status(201).json({ success: true, message: "Registratioon Successfull" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, error: "Error in Registration" });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required." });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(409).json({ success: false, error: "User Not found" });
    }

    const isPassword = await bcrypt.compare(password, user?.password);
    if (!isPassword) {
      return res.status(409).json({ status: false, error: "Password is incorrect" });
    }
    const token = jwt.sign({ id: user?._id }, process.env.JWT_Secret, { expiresIn: "24h" });
    return res.status(200).json({ status: true, message: "LogIn successfully", token, user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const userProfile = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const user = await decodeJwt(token);

    if (!user) return res.status(201).json({ success: false, message: "Invalid Token" });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid or expired token" });
  }
};


const updateProfile = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log({token});
    
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Please send token" });
    }
    
    const user = await decodeJwt(token);
    console.log({user});
    
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    
    const { name, role, department, skills, seniority } = req.body;
    console.log({name, role, department, skills, seniority});

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        name,
        role,
        department,
        skills,
        seniority,
      },
      { new: true } // returns updated document
    );
console.log((updatedUser));

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, error: "Error updating profile" });
  }
};


module.exports = { signUp, logIn, userProfile, updateProfile };
