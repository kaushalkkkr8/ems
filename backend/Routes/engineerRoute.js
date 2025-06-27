const express= require("express");
const router = express.Router();
const { getEngineerCapacity, getAllEngineers } = require("../Controller/engineerController");

router.get("/",getAllEngineers)
router.get("/:id/capacity",getEngineerCapacity)

module.exports=router