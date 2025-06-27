const AssignmentModel = require("../Model/assingnmentModel");
const ProjectModel = require("../Model/projectModel");
const { decodeJwt } = require("../utility/verifyToken");

const getAllProjects = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Please Send token" });
    const user = await decodeJwt(token);
    if (!user) return res.status(201).json({ success: false, message: "Invalid Token" });

    const projects = await ProjectModel.find().populate("managerId", "name email");
    res.status(200).json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

const getProjectById = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Please Send token" });
    const user = await decodeJwt(token);
    if (!user) return res.status(201).json({ success: false, message: "Invalid Token" });

    const project = await ProjectModel.findById(req.params.id).populate("managerId", "name email");

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server error", err });
  }
};
const getProjectByEngineerId = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Please Send token" });
    const user = await decodeJwt(token);
    if (!user) return res.status(201).json({ success: false, message: "Invalid Token" });

    const project = await AssignmentModel.find({ engineerId: user?._id }).populate("projectId");

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server error", err });
  }
};

// POST create a new project
const createProject = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Please Send token" });
    const user = await decodeJwt(token);
    if (!user) return res.status(201).json({ success: false, message: "Invalid Token" });

    const { name, description, startDate, endDate, requiredSkills, teamSize, status } = req.body;

    const project = new ProjectModel({ name, description, startDate, endDate, requiredSkills, teamSize, status, managerId: user?._id });

    await project.save();
    res.status(201).json({ success: true, message: "Project created", project });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: "Internal Server error", err });
  }
};
const updateProject = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Please send token" });

    const user = await decodeJwt(token);
    if (!user) return res.status(401).json({ success: false, message: "Invalid token" });

    const projectId = req.params.id;
    const updateData = req.body;

    const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, { ...updateData, managerId: user._id }, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, message: "Project updated", project: updatedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error", err });
  }
};
const deleteProject = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Please send token" });

    const user = await decodeJwt(token);
    if (!user) return res.status(401).json({ success: false, message: "Invalid token" });

    const projectId = req.params.id;


    const updatedProject = await ProjectModel.findByIdAndDelete({_id:projectId})

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, message: "Project updated", project: updatedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error", err });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  getProjectByEngineerId,
  updateProject,
  deleteProject

};
