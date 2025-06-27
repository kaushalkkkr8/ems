const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  requiredSkills: { type: [String], default: [] },
  teamSize: Number,
  status: { type: String, enum: ['planning', 'active', 'completed'], default: 'planning' },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
}, { timestamps: true });

const ProjectModel = mongoose.model('Projects', ProjectSchema);
module.exports=ProjectModel
