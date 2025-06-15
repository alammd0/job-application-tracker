
const express = require("express");
const { addJob, editJob, getAllJob, getjobdetailsById, deleteJob } = require("../controllers/jobControllers");
const { middleware } = require("../middleware/middleware");

const router = express.Router();

router.post("/create-job", middleware, addJob);
router.put("/update-job/:id", middleware, editJob);
router.get("/get-all-jobs", middleware, getAllJob);
router.get("/job-details/:id", middleware, getjobdetailsById);
router.delete("/delete-job/:id", middleware, deleteJob);

module.exports = router;