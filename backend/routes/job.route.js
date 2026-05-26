const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const { postJob, getAllJobs, getAdminJobs, getJobById } = require("../controllers/job.controller.js");

router.post("/post", isAuthenticated, postJob);
router.get("/get", getAllJobs);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);
router.get("/get/:id", getJobById);

module.exports = router;
