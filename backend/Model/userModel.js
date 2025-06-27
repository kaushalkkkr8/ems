const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }, // Add for authentication
    role: { type: String, enum: ["engineer", "manager"], required: true },
    skills: { type: [String], default: [] }, // Only for engineers
    seniority: { type: String, enum: ["junior", "mid", "senior"] },
    maxCapacity: { type: Number, default: 100 }, // 100 or 50
    department: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
