const AssignmentModel = require("../Model/assingnmentModel");
const UserModel = require("../Model/userModel");
const { decodeJwt } = require("../utility/verifyToken");

const getAllAssignments = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Please Send token" });
    const user = await decodeJwt(token);
    if (!user) return res.status(201).json({ success: false, message: "Invalid Token" });

    const assignments = await AssignmentModel.find().populate("engineerId", "name email skills").populate("projectId", "name status teamSize");

    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// POST create assignment
const createAssignment = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    
    
    if (!token) return res.status(401).json({ success: false, message: "Please Send token" });
    const user = await decodeJwt(token);
    if (!user) return res.status(201).json({ success: false, message: "Invalid Token" });

    const { engineerId, projectId, allocationPercentage, startDate, endDate, role } = req.body;
    
    const engineer = await UserModel.findById(engineerId);

    if (!engineer || engineer?.role !== "engineer") {
      return res.status(404).json({ message: "Engineer not found" });
    }

    // Calculate total allocation
    const assignments = await AssignmentModel.find({ engineerId });
    const totalAllocated = assignments.reduce((sum, a) => sum + a.allocationPercentage, 0);

    if (totalAllocated + allocationPercentage > engineer.maxCapacity) {
      return res.status(400).json({ message: "Engineer is overallocated" });
    }

    const assignment = new AssignmentModel({ engineerId, projectId, allocationPercentage, startDate, endDate, role });

    await assignment.save();
    res.status(201).json({ message: "Assignment created", assignment });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// PUT update assignment
const updateAssignment = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Please Send token" });
    const user = await decodeJwt(token);
    if (!user) return res.status(201).json({ success: false, message: "Invalid Token" });

    const assignment = await AssignmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({ message: "Assignment updated", assignment });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// DELETE assignment
const deleteAssignment = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Please Send token" });
    const user = await decodeJwt(token);
    if (!user) return res.status(201).json({ success: false, message: "Invalid Token" });

    const assignment = await AssignmentModel.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({ message: "Assignment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

module.exports = {
  getAllAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
