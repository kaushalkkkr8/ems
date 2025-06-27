const AssignmentModel = require("../Model/assingnmentModel");
const UserModel = require("../Model/userModel");
const { decodeJwt } = require("../utility/verifyToken");

const getAllEngineers = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Please Send token" });
    const user = await decodeJwt(token);
    if (!user) return res.status(201).json({ success: false, message: "Invalid Token" });

    const engineers = await UserModel.find({ role: "engineer" }).select("-password");
    res.status(200).json({ success: true, engineers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getEngineerCapacity = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Please Send token" });
    const user = await decodeJwt(token);
    if (!user) return res.status(201).json({ success: false, message: "Invalid Token" });

    const engineerId = req.params.id;

    const engineer = await UserModel.findById(engineerId);

    if (!engineer || engineer.role !== "engineer") {
      return res.status(404).json({ message: "Engineer not found" });
    }

    const assignments = await AssignmentModel.find({ engineerId });
    const totalAllocated = assignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
    const available = engineer.maxCapacity - totalAllocated;

    res.status(200).json({
      engineer: engineer.name,
      maxCapacity: engineer.maxCapacity,
      allocated: totalAllocated,
      available,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getAllEngineers, getEngineerCapacity };
