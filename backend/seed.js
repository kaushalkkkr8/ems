const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./Model/userModel");
const Project = require("./Model/projectModel");
const Assignment = require("./Model/assingnmentModel");
dotenv.config();

const MONGODB_URI = process.env.MONGO;

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // await User.deleteMany();
    // await Project.deleteMany();
    // await Assignment.deleteMany();

    const manager = await User.create({
      email: 'managerr@example.com',
      name: 'Manager One',
      password: 'password123',
      role: 'manager',
      department: 'Engineering',
    });

    const engineer1 = await User.create({
      email: 'engineer1@example.com',
      name: 'Engineer One',
      password: 'password123',
      role: 'engineer',
      skills: ['React', 'Node.js'],
      seniority: 'mid',
      maxCapacity: 100,
    });

    const engineer2 = await User.create({
      email: 'engineer2@example.com',
      name: 'Engineer Two',
      password: 'password123',
      role: 'engineer',
      skills: ['MongoDB', 'Express'],
      seniority: 'senior',
      maxCapacity: 100,
    });

    const project1 = await Project.create({
      name: 'Project Alpha',
      description: 'A new alpha project',
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-10-01'),
      requiredSkills: ['React', 'Node.js'],
      teamSize: 3,
      status: 'active',
      managerId: manager._id,
    });

    const project2 = await Project.create({
      name: 'Project Beta',
      description: 'A new beta project',
      startDate: new Date('2025-08-01'),
      endDate: new Date('2025-12-01'),
      requiredSkills: ['MongoDB'],
      teamSize: 2,
      status: 'planning',
      managerId: manager._id,
    });

    await Assignment.create({
      engineerId: engineer1._id,
      projectId: project1._id,
      allocationPercentage: 50,
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-09-01'),
      role: 'Frontend Developer',
    });

    await Assignment.create({
      engineerId: engineer2._id,
      projectId: project1._id,
      allocationPercentage: 50,
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-09-01'),
      role: 'Backend Developer',
    });

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedDatabase();
