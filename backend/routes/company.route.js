const express = require("express");
const router = express.Router();

const { 
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany
} = require("../controllers/company.controller.js");

const isAuthenticated = require("../middlewares/isAuthenticated.js");
const upload = require("../middlewares/multer.js");

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.put("/update/:id", isAuthenticated, upload.single("logo"), updateCompany);

module.exports = router;