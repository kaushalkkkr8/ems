const express= require("express");
const { getAllAssignments, createAssignment, updateAssignment, deleteAssignment } = require("../Controller/assignmentController");
const router = express.Router();


router.get("/", getAllAssignments);

router.post("/",  createAssignment);

router.put("/:id", updateAssignment);

router.delete("/:id", deleteAssignment);

module.exports = router;