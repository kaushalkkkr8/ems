const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  engineerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects', required: true },
  allocationPercentage: { type: Number, required: true }, 
  startDate: Date,
  endDate: Date,
  role: { type: String }
}, { timestamps: true });

const AssignmentModel = mongoose.model('Assignments', AssignmentSchema);
module.exports=AssignmentModel
